import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { refreshSmartCarTokens } from "./refreshSmartcarAuth";

export const fetchVehicleData = async () => {
	try {
		// 1. Get the currently authenticated user.
		const user = auth.currentUser;
		if (!user) {
			throw new Error("No authenticated user found");
		}
		const userId = user.uid;
		const service = "smart_car"; // Replace or parameterize if needed.

		// 2. Fetch the token data from Firestore.
		const tokenDocRef = doc(db, "users", userId, "auth_tokens", service);
		const docSnap = await getDoc(tokenDocRef);
		if (!docSnap.exists()) {
			console.log("No token data found for user.");
			return;
		}
		const tokenData = docSnap.data();
		const { accessToken, refreshToken, ttl, updateAt } = tokenData;
		console.log(tokenData);
		console.log(refreshToken);
		if (!ttl) console.log("Missing ttl");
		if (!updateAt) console.log("Missing updateAt");
		if (!accessToken) {
			console.log("Access token is missing:", tokenData);
			return;
		}

		if (updateAt && ttl) {
			const DateUpdated = new Date(updateAt);
			const expirationTime = DateUpdated.getTime() + ttl * 1000;
			if (Date.now() > expirationTime) {
				console.log("Token expired, refreshing...");
				const newtokenData = await refreshSmartCarTokens(refreshToken);
				accessToken = newtokenData.access_token;
			} else {
				console.log("Token still valid");
			}
		} else {
			console.log("Missing token ttl data");
		}

		// 3. Use the access token to call Smartcar endpoints.
		// Example: Fetch list of vehicles.
		const vehiclesResponse = await fetch("https://api.smartcar.com/v1.0/vehicles", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		const vehiclesData = await vehiclesResponse.json();
		console.log("Vehicles list:", vehiclesData);

		if (!vehiclesData.vehicles || vehiclesData.vehicles.length === 0) {
			console.log("No vehicles connected.");
			return;
		}
		// Example: Using the first vehicle in the list.
		const vehicleId = vehiclesData.vehicles[0];
		console.log("Using vehicleId:", vehicleId);

		// Fetch additional vehicle data.
		const vehicleInfoResponse = await fetch(`https://api.smartcar.com/v1.0/vehicles/${vehicleId}`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		const vehicleInfo = await vehicleInfoResponse.json();
		console.log("Vehicle Info:", vehicleInfo);

		// Fetch odometer data.
		const odometerResponse = await fetch(
			`https://api.smartcar.com/v1.0/vehicles/${vehicleId}/odometer`,
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		);
		const odometerData = await odometerResponse.json();
		console.log("Odometer Data:", odometerData);

		// 4. Fetch oil data.
		const oilResponse = await fetch(
			`https://api.smartcar.com/v2.0/vehicles/${vehicleId}/engine/oil`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		const oilData = await oilResponse.json();
		console.log("Oil life:", oilData);

		// 5. Fetch tire data.
		const tireResponse = await fetch(
			`https://api.smartcar.com/v2.0/vehicles/${vehicleId}/tires/pressure`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		const tireData = await tireResponse.json();
		console.log("Tire pressure status:", tireData);

		// 6. Fetch gas/fuel data.
		const gasResponse = await fetch(`https://api.smartcar.com/v2.0/vehicles/${vehicleId}/fuel`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const gasData = await gasResponse.json();
		console.log("Gas data:", gasData);
	} catch (error) {
		console.error("Error fetching vehicle data:", error);
	}
};
