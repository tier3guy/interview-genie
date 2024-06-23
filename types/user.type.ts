export interface UserType {
    id: number;
    clerkId: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    createdAt: Date;
    isSubscribed: boolean;
    subscribedAt: Date | null;
    subscriptionKey: string | null;
    unsubscribedAt: Date | null;
    tests: object[];
    testsLimit: number;
}
