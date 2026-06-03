import { db } from "@/config/db";
import { openrouter } from "@/config/openrouter";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/Promt";
import { NextRequest, NextResponse } from "next/server";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { eq } from "drizzle-orm";
export async function POST(req:NextRequest) {

    const {userInput,deviceType,projectId}=await req.json();

    const aiResult = await openrouter.chat.completions.create({
  model: "openai/gpt-5.1-codex-mini",//you replace any other Free Model
  messages: [
    {
        role:'system',
        content:[
            {
                type:'text',
                text:APP_LAYOUT_CONFIG_PROMPT.replace('{deviceType}',deviceType)
            }
        ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": userInput
        },
      ]
    }
  ],
  stream:false
});
const JSONAiResult=JSON.parse(aiResult?.choices[0]?.message?.content as string)

if(JSONAiResult)
{
    //Update Project Table with ProjectName
    await db.update(ProjectTable)
    .set({
      projectVisualDescription:JSONAiResult?.projectVisualDescription,
      projectName:JSONAiResult?.projectName,
      theme:JSONAiResult?.theme,
      //@ts-ignore
    })
    .where(eq(ProjectTable.projectId, projectId as string));

    //Insert ScreenConfig



      JSONAiResult.screens?.forEach(async(screen:any)=>{
      const result=await db.insert(ScreenConfigTable).values({

        projectId:projectId,
        purpose:screen?.purpose,
        screenDescription:screen?.layoutDescription,
        screenId:screen?.id,
        screenName:screen?.name
      });

      })
  return NextResponse.json(JSONAiResult)

}
else{
  NextResponse.json({msg:"Internal Server Error"})
}

}

