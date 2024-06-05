import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { addMarkMap, type MarkMap } from "$lib";
import { fail, redirect } from "@sveltejs/kit";
import type { Load } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { nanoid } from "nanoid";
import { z } from "zod";

const mapSchema = z.object({
    title: z.string().min(1, { message: "Write a title." }).default(""),
    markdown: z.string().min(1, { message: "Insert a markdown content" }).default("")
});

export const load: Load = async () => {
    const mapForm = await superValidate(zod(mapSchema));
    return { mapForm };
};

export const actions: Actions = {
    create_map: async ({ request }) => {
        const form = await superValidate(request, zod(mapSchema));
        if (!form.valid) return fail(400, { form });

        const { title, markdown } = form.data;

        let markmap: MarkMap;
        try {
            markmap = await addMarkMap({ title, markdown, short_id: nanoid(6) })
        } catch (error: any) {
            return message(form, "Error, try later.");
        }

        return redirect(307, `/${markmap.short_id}`);
    }
};