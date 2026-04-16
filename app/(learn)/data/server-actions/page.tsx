import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { PostForm } from "./post-form";
import { PostList } from "./post-list";

export default function ServerActionsPage() {
	return (
		<DemoPage
			title="Server Actions"
			description="Server Actions are async functions that run on the server. Call them from forms or event handlers to mutate data — no API routes needed."
		>
			<Section
				title="Live Demo — CRUD with Server Actions"
				description="Create and delete posts using Server Actions. The form submits directly to the server, validates with Zod, and revalidates the page."
			>
				<div className="grid gap-4 md:grid-cols-2">
					<PostForm />
					<PostList />
				</div>
			</Section>

			<Section title="Defining a Server Action">
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

			<Section title="Using with useActionState (React 19)">
				<CodeBlock filename="components/form.tsx" language="tsx">{`'use client'
import { useActionState } from 'react'
import { createPost } from '@/app/actions'

export function PostForm() {
  // useActionState manages form state + pending status
  const [state, formAction, isPending] = useActionState(
    createPost,
    null  // initial state
  )

  return (
    <form action={formAction}>
      <input name="title" />
      <input name="content" />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>
      {state?.message && <p>{state.message}</p>}
    </form>
  )
  // ✅ Works without JavaScript (progressive enhancement)
  // ✅ Shows pending state while action runs
  // ✅ Displays result from server action
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Progressive Enhancement">
						<p className="text-sm text-muted-foreground">
							Forms with Server Actions work even with JavaScript disabled. The
							form submits as a regular POST request.
						</p>
					</DemoBox>
					<DemoBox title="Always Validate">
						<p className="text-sm text-muted-foreground">
							Server Actions receive raw FormData. Always validate with Zod or
							similar. Never trust client input — even from your own forms.
						</p>
					</DemoBox>
					<DemoBox title="Revalidate After Mutation">
						<p className="text-sm text-muted-foreground">
							Call revalidatePath or revalidateTag after mutating data to
							refresh the page with updated content.
						</p>
					</DemoBox>
					<DemoBox title="useActionState (React 19)">
						<p className="text-sm text-muted-foreground">
							Replaces the old useFormState. Returns [state, action, isPending]
							— built-in pending state, no need for useTransition.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
