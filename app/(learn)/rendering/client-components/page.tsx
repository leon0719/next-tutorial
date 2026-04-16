import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { CounterDemo } from "./counter-demo";
import { FormDemo } from "./form-demo";

export default function ClientComponentsPage() {
	return (
		<DemoPage
			title="Client Components"
			description="Add 'use client' to opt into interactivity. Client Components can use hooks, event handlers, and browser APIs."
		>
			<Section
				title="Interactive Demos"
				description="These components use 'use client' — they run in the browser and can respond to user interaction."
			>
				<div className="grid gap-4 md:grid-cols-2">
					<CounterDemo />
					<FormDemo />
				</div>
			</Section>

			<Section title="The 'use client' Directive">
				<CodeBlock
					filename="components/counter.tsx"
					language="tsx"
				>{`"use client"; // ← This line makes it a Client Component

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}

// Without "use client", using useState would cause:
// Error: useState only works in Client Components`}</CodeBlock>
			</Section>

			<Section title="What Triggers 'use client'?">
				<CodeBlock
					filename="needs-use-client.tsx"
					language="tsx"
				>{`// You NEED "use client" when using:

// 1. React hooks
useState, useEffect, useRef, useContext, useReducer...

// 2. Event handlers
onClick, onChange, onSubmit, onKeyDown...

// 3. Browser APIs
window, document, localStorage, navigator...

// 4. Custom hooks that use any of the above
useRouter() (from next/navigation)
usePathname(), useSearchParams()

// You DON'T need it for:
// - Displaying data
// - Fetching on the server
// - Static content`}</CodeBlock>
			</Section>

			<Section title="The Boundary Effect">
				<p className="text-sm text-muted-foreground mb-3">
					When you mark a file as "use client", everything it imports also
					becomes part of the client bundle.
				</p>
				<CodeBlock filename="boundary.tsx" language="tsx">{`"use client";

// ⚠️ These imports are now ALL in the client bundle:
import { HeavyLibrary } from "heavy-library";  // 50kb!
import { AnotherLib } from "another-lib";       // 30kb!
import { MyComponent } from "./my-component";   // also client now

// 💡 Solution: Keep "use client" as deep as possible
// Only the interactive leaf components should be client
// Parent layout/page can stay as Server Components`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Opt-in, Not Default">
						<p className="text-sm text-muted-foreground">
							Components are Server Components by default. Only add "use client"
							when you need interactivity. Keep the boundary as deep as
							possible.
						</p>
					</DemoBox>
					<DemoBox title="Bundle Impact">
						<p className="text-sm text-muted-foreground">
							Everything imported by a "use client" file becomes part of the
							client JS bundle. This is why you should push the boundary down to
							leaf components.
						</p>
					</DemoBox>
					<DemoBox title="Props Must Be Serializable">
						<p className="text-sm text-muted-foreground">
							When a Server Component passes props to a Client Component, the
							props must be serializable (no functions, no classes, no Date
							objects).
						</p>
					</DemoBox>
					<DemoBox title="Hooks Need Client">
						<p className="text-sm text-muted-foreground">
							useState, useEffect, useRef, and all React hooks only work in
							Client Components. The "use client" directive is your entry point
							to React's interactive features.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
