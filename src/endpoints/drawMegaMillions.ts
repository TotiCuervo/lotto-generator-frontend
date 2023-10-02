import { client } from "@/utils";

export async function drawMegaMillions(size: number, profileId?: string) {
    return client.post("draw/megamillions", {
        size,
        profileId,
    });
}
