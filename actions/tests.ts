"use server";

import { TestType } from "@/types/test.type";
import { db } from "../db";
import { InsertTest, testTable, SelectTest, SelectUser } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createTest(data: InsertTest) {
    const test = await getTestById(data.testId);
    if (test) return true;

    const resp = await db.insert(testTable).values(data);
    return resp ? true : false;
}

export async function getTestById(id: SelectTest["testId"]) {
    const tests = (await db
        .select()
        .from(testTable)
        //@ts-ignore
        .where(eq(testTable.testId, id))
        .limit(1)
        .execute()) as TestType[];

    return tests.length > 0 ? tests[0] : null;
}

export async function getAllTest(id: SelectUser["clerkId"]) {
    const tests = (await db
        .select()
        .from(testTable)
        //@ts-ignore
        .where(eq(testTable.clerkId, id))
        .execute()) as TestType[];

    return tests;
}

export async function updateTestField(
    testId: string,
    field: keyof InsertTest,
    value: InsertTest[keyof InsertTest]
) {
    const resp = await db
        .update(testTable)
        .set({ [field]: value })
        //@ts-ignore
        .where(eq(testTable.testId, testId))
        .execute();

    return resp ? true : false;
}

export async function deleteTestById(id: SelectTest["testId"]) {
    const resp = await db
        .delete(testTable)
        //@ts-ignore
        .where(eq(testTable.testId, id))
        .execute();

    return resp ? true : false;
}
