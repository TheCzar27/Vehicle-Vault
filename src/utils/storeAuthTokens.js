import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

export async function storeAuthTokens(service, accessToken, refreshToken, ttl) {
	const user = auth.currentUser;
	const userId = user.uid;
	try {
		const tokenDocRef = doc(db, "users", userId, "auth_tokens", service);

		await setDoc(
			tokenDocRef,
			{
				accessToken,
				refreshToken,
				ttl,
				updateAt: new Date().toISOString(),
			},
			{ merge: true }
		);
		console.log(`Stored tokens in server,\n
            Service: ${service}\n
            UID: ${userId}`);
	} catch (error) {
		console.log("Error storing tokens: ", error);
	}
}
