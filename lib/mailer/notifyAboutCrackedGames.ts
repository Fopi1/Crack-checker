import { prisma } from "@/prisma/prisma";

import { sendCrackedGameNotification } from "../mailer";

export const notifyAboutCrackedGames = async () => {
  let i = 0;
  console.log("Getting cracked games");
  const crackedGames = await prisma.game.findMany({
    where: {
      crackDate: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      crackDate: true,
      subscriptions: {
        where: {
          notifiedOnCrack: false,
          createdAt: {
            lt: new Date(),
          },
        },
        include: {
          user: true,
        },
      },
    },
  });
  console.log("Starting sending notifications");
  for (const game of crackedGames) {
    for (const subscription of game.subscriptions) {
      if (subscription.createdAt < new Date(game.crackDate!)) {
        await sendCrackedGameNotification(subscription.user.email, game.title);
        await prisma.subscription.update({
          where: {
            id: subscription.id,
          },
          data: { notifiedOnCrack: true },
        });
        i++;
      }
    }
  }
  console.log(`Notifications were sent to ${i} people`);
};
