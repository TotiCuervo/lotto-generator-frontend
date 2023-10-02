import { client } from "@/utils";

export async function drawPowerball(size: number, profileId?: string) {
    return client.post("draw/powerball", {
        size,
        profileId,
    });
}
