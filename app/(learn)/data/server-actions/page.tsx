import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { PostForm } from "./post-form";
import { PostList } from "./post-list";

export default async function ServerActionsPage() {
	const t = await getTranslations("data.serverActions");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveDemo")} description={t("liveDemoDescription")}>
				<div className="grid gap-4 md:grid-cols-2">
					<PostForm />
					<PostList />
				</div>
			</Section>

			<Section title={t("defining")}>
				<CodeBlock
					filename="app/actions.ts"
					language="tsx"
				>{`'use server'  // ← File-level directive: all exports are Server Actions

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/lib/db'

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export async function createPost(
  prevState: { message: string } | null,
  formData: FormData
) {
  const parsed = schema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!parsed.success) {
    return { message: parsed.error.errors[0].message }
  }

  await db.insert(posts).values(parsed.data)
  revalidatePath('/posts')
  return { message: 'Post created!' }
}`}</CodeBlock>
			</Section>

			<Section title={t("usingWithActionState")}>
				<CodeBlock filename="components/form.tsx" language="tsx">{`'use client'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { createPost } from '@/app/actions'

// Nested inside <form>, useFormStatus reads the parent form's
// submission state — no prop drilling, no closure over isPending.
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create'}
    </button>
  )
}

export function PostForm() {
  // useActionState owns state + formAction
  const [state, formAction] = useActionState(createPost, null)

  return (
    <form action={formAction}>
      <input name="title" />
      <input name="content" />
      <SubmitButton />
      {state?.message && <p>{state.message}</p>}
    </form>
  )
  // ✅ Works without JavaScript (progressive enhancement)
  // ✅ SubmitButton auto-disables while the action runs
  // ✅ Two hooks, two responsibilities: state vs. pending
}`}</CodeBlock>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("progressiveEnhancement")}>
						<p className="text-sm text-muted-foreground">
							{t("progressiveEnhancementDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("alwaysValidate")}>
						<p className="text-sm text-muted-foreground">
							{t("alwaysValidateDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("revalidateAfterMutation")}>
						<p className="text-sm text-muted-foreground">
							{t("revalidateAfterMutationDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("useActionState")}>
						<p className="text-sm text-muted-foreground">
							{t("useActionStateDescription")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
