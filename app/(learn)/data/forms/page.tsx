import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { ContactFormDemo } from "./contact-form";

export default async function FormsPage() {
	const t = await getTranslations("data.forms");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveDemo")} description={t("liveDemoDescription")}>
				<ContactFormDemo />
			</Section>

			<Section title={t("schemaDefinition")}>
				<CodeBlock filename="schema.ts" language="tsx">{`import { z } from 'zod'

// Define your form schema with Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Infer TypeScript type from schema
type ContactForm = z.infer<typeof contactSchema>
// → { name: string; email: string; subject: string; message: string }`}</CodeBlock>
			</Section>

			<Section title={t("useFormSetup")}>
				<CodeBlock
					filename="contact-form.tsx"
					language="tsx"
				>{`import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const {
  register,       // Connect inputs to form state
  handleSubmit,   // Wrap your submit handler with validation
  formState: {
    errors,        // Validation errors per field
    isSubmitting,  // True while submit handler runs
  },
  reset,          // Reset form to default values
} = useForm<ContactForm>({
  resolver: zodResolver(contactSchema),
  // defaultValues: { name: '', email: '', ... }
})`}</CodeBlock>
			</Section>

			<Section title={t("zodResolverSection")}>
				<CodeBlock
					filename="resolver-setup.tsx"
					language="tsx"
				>{`// zodResolver bridges react-hook-form and Zod
import { zodResolver } from '@hookform/resolvers/zod'

useForm({
  resolver: zodResolver(contactSchema),
  // ✅ Validates all fields against the Zod schema
  // ✅ Errors map to field names automatically
  // ✅ TypeScript types inferred from schema
})

// Zod v4 note: validation issues use .issues (not .errors)
const result = contactSchema.safeParse(data)
if (!result.success) {
  console.log(result.error.issues) // ← Zod v4
}`}</CodeBlock>
			</Section>

			<Section title={t("errorDisplay")}>
				<CodeBlock filename="error-display.tsx" language="tsx">{`<div>
  <Input placeholder="Name" {...register('name')} />
  {errors.name && (
    <p className="text-xs text-destructive mt-1">
      {errors.name.message}
    </p>
  )}
</div>

// errors object structure:
// errors.name?.message   → "Name must be at least 2 characters"
// errors.email?.message  → "Invalid email address"
// Each field maps to its Zod validation message`}</CodeBlock>
			</Section>

			<Section title={t("handleSubmitSection")}>
				<CodeBlock
					filename="submit-handler.tsx"
					language="tsx"
				>{`<form onSubmit={handleSubmit(onSubmit)}>
  {/* handleSubmit:
    1. Prevents default form submission
    2. Validates all fields via zodResolver
    3. If valid → calls onSubmit(data) with typed data
    4. If invalid → populates errors object, skips onSubmit
  */}
</form>

const onSubmit = (data: ContactForm) => {
  // data is fully typed and validated
  // { name: string, email: string, subject: string, message: string }
  console.log(data)
}`}</CodeBlock>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("typeSafety")}>
						<p className="text-sm text-muted-foreground">
							{t("typeSafetyDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("declarativeValidation")}>
						<p className="text-sm text-muted-foreground">
							{t("declarativeValidationDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("minimalRerenders")}>
						<p className="text-sm text-muted-foreground">
							{t("minimalRerendersDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("composableSchemas")}>
						<p className="text-sm text-muted-foreground">
							{t("composableSchemasDescription")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
