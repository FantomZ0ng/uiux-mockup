import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Автор на відео визначає, які сторінки є публічними (вхід та реєстрація)
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect(); // Захищає всі інші маршрути, включаючи наш /api/user
  }
});

export const config = {
    matcher: [
      // Запускає middleware для всіх маршрутів, окрім статичних файлів (зображення, стилі тощо)
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
      // Завжди запускається для всіх API-роутів
      '/(api|trpc)(.*)',
    ],
  };