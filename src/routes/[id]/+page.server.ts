import type { PageServerLoad } from "./$types";
import { getMarkMap } from "$lib";

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
    let data = await getMarkMap(params.id);
    data = JSON.parse(JSON.stringify(data));
    return data;
};