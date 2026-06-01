import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Додаємо '/' до масиву публічних сторінок
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect(); // Тепер захищає все, КРІМ головної сторінки та авторизації
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