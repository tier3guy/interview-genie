"use server";

import { UserType } from "@/types/user.type";
import { db } from "../db";
import { InsertUser, userTable, SelectUser } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createUser(data: InsertUser) {
    const resp = await db.insert(userTable).values(data);
    return resp;
}

export async function getUserById(
    id: SelectUser["clerkId"]
): Promise<UserType | null> {
    const users = (await db
        .select()
        .from(userTable)
        //@ts-ignore
        .where(eq(userTable.clerkId, id))
        .limit(1)
        .execute()) as UserType[];

    return users.length > 0 ? users[0] : null;
}

export async function updateUserField(
    clerkId: string,
    field: keyof InsertUser,
    value: InsertUser[keyof InsertUser]
) {
    const resp = await db
        .update(userTable)
        .set({ [field]: value })
        //@ts-ignore
        .where(eq(userTable.clerkId, clerkId))
        .execute();

    return resp ? true : false;
}
