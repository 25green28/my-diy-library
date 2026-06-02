import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/learning/sidebar/AppSidebar.tsx";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, Bot} from "lucide-react";

const markdown = `# Hello World in Python

### Basic Example
Here's a basic example of a "Hello, World!" program in Python:

\`\`\`python
print("Hello, World!")
\`\`\`
## Hi
`;

export default function Learning() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <main className={"p-5 w-full"}>
                    <div className={"flex flex-row justify-between items-center w-full"}>
                        <SidebarTrigger className={"p-2 bg-gray-100 rounded-sm mb-5"}/>
                        <div className={"flex flex-row gap-2"}>
                            <Button className={"bg-gray-800"}>
                                <Bot/>
                                Check
                            </Button>
                            <Button>
                                Next lesson
                                <ArrowRight/>
                            </Button>
                        </div>
                    </div>
                    <div className={"px-3"}>
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => <h1 {...props} className="text-2xl text-center font-bold leading-8" />,
                                h2: ({ node, ...props }) => <h2 {...props} className="text-xl font-bold leading-8" />,
                                h3: ({ node, ...props }) => <h3 {...props} className="text-lg font-bold leading-8" />,
                                p: ({ node, ...props }) => <p {...props} className="text-base leading-8" />,
                                code(props) {
                                    const { node, className, children, ...rest } = props;
                                    const match = /language-(\w+)/.exec(className || '');

                                    return match ? (
                                        <SyntaxHighlighter
                                            style={oneLight}
                                            language={match[1]}
                                            PreTag="div"
                                            {...rest}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...rest}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}