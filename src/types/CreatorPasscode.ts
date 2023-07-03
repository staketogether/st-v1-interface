import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';

export interface CreatorPasscode {
    passcode: string;
    creator: string;
    chainId: number;
    ethLimit: string;
    amountToSend: string;
    accountsDistributed: string[];
}

export const creatorPasscodeConverter = {
    toFirestore(creatorPasscode: CreatorPasscode): DocumentData {
        return creatorPasscode;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): CreatorPasscode {
        const data = snapshot.data();
        return {
            passcode: data.passcode,
            creator: data.creator,
            chainId: data.chainId,
            ethLimit: data.ethLimit,
            amountToSend: data.amountToSend,
            accountsDistributed: data.accountsDistributed
        };
    }
}