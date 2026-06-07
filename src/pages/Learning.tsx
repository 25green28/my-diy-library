import AppSidebar from "@/components/learning/sidebar/AppSidebar.tsx";
import ReactMarkdown from "react-markdown";
import lessonData from "@/assets/lessons/lessons.json"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, Bot, Loader2, CheckCircle2, XCircle} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import type { currentLesson, category} from "@/assets/lessons/lessonObjects.ts";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Separator} from "@/components/ui/separator.tsx";


export default function Learning() {
    const categories = lessonData.categories as category[];
    const [currentLesson, setCurrentLesson] = useState<currentLesson>();
    const [markdownContent, setMarkdownContent]= useState("");
    const [nextButtonActivated, setNextButtonActivated] = useState(true);
    const [isRunningTests, setIsRunningTests] = useState(false);
    const [testResults, setTestResults] = useState<Array<{id: number, name: string, passed: boolean, status?: number, expectedStatus?: number, expectedBody?: string, hint?: string, body?: string, error?: string}>>([]);

    const fetchMarkdown = useCallback(async () => {
        if (currentLesson === undefined)
            return;
        try {
            const content = await import(currentLesson.data.path + "?raw");
            setMarkdownContent(content.default);
        } catch (err) {
            console.error("Failed to load markdown: ", err);
        }
    }, [currentLesson]);

    useEffect(() => {
        setLesson(0, 0);
    }, []);

    useEffect(() => {
        fetchMarkdown();
    }, [fetchMarkdown]);

    function setLesson(category: number, lesson: number) {
        const newLesson: currentLesson = {
            parentCategory: category,
            data: categories[category].lessons[lesson]
        }
        setCurrentLesson(newLesson);
        setNextButtonActivated(doesNextLessonExist(newLesson.parentCategory, newLesson.data.id))
    }

    function doesNextLessonExist(parentCategory: number, lessonNumber: number): boolean {
        let category = parentCategory;
        const lesson = categories[category].lessons[lessonNumber + 1];
        if (lesson === undefined) {
            category++;
            if (category >= categories.length) {
                // console.log("doesNextLessonExist(), category limit reached")
                return false;
            }
            if (categories[category].lessons[0] === undefined) {
                // console.log("doesNextLessonExist(), lessons in category not found")
                return false;
            }
        }
        return true;
    }

    function setNextLesson() {
        if (currentLesson === undefined)
            return;
        let category = currentLesson?.parentCategory;
        let lesson = categories[category].lessons[currentLesson.data.id + 1];
        if (lesson === undefined) {
            category++;
            if (category == categories.length) {
                // console.log("setNextLesson(), category limit reached")
                return;
            }
            lesson = categories[category].lessons[0];
            if (lesson === undefined) {
                // console.log("setNextLesson(), lessons in category not found")
                return;
            }
        }

        if (doesNextLessonExist(category, lesson.id)) {
            setNextButtonActivated(true);
        } else {
            setNextButtonActivated(false);
        }

        const newLesson: currentLesson = {
            parentCategory: category,
            data: lesson
        }
        setCurrentLesson(newLesson)
    }

    const runTests = async () => {
        if (!currentLesson?.data.tests) return;

        setIsRunningTests(true);
        setTestResults([]);

        const results = await Promise.all(
            currentLesson.data.tests.map(async (test) => {
                try {
                    const response = await fetch(test.url, { method: test.method });
                    const body = await response.text();
                    const passed = response.status === test.expectedStatus && (test.expectedBody !== undefined ? body === test.expectedBody : true);
                    return {
                        id: test.id,
                        name: test.name,
                        passed,
                        status: response.status,
                        expectedStatus: test.expectedStatus,
                        expectedBody: test.expectedBody,
                        hint: test.hint,
                        body
                    };
                } catch (error) {
                    return {
                        id: test.id,
                        passed: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    };
                }
            })
        );

        setTestResults(results);
        setIsRunningTests(false);
    }

    return (
        <>
            <SidebarProvider>
                <AppSidebar setLesson={setLesson} typedCategories={categories} currentLesson={currentLesson}/>
                <main className={"p-5 w-full"}>
                    <div className={"flex flex-row justify-between items-center w-full"}>
                        <SidebarTrigger className={"p-2 bg-gray-100 rounded-sm mb-5"}/>
                        <div className={"flex flex-row gap-2"}>
                            { currentLesson?.data.tests !== undefined &&
                                <Dialog onOpenChange={(open) => { if (open) runTests() }}>
                                    <DialogTrigger>
                                        <Button className={"bg-gray-800"}>
                                            <Bot/>
                                            Check
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{currentLesson?.data.title} tests</DialogTitle>
                                            <DialogDescription>
                                                {isRunningTests ? "Running tests..." : "Test results"}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="mt-4">
                                            {isRunningTests ? (
                                                <div className="flex items-center justify-center py-8">
                                                    <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {testResults.map((result) => (
                                                        !result.passed ? (
                                                            <Dialog key={result.id}>
                                                                <DialogTrigger asChild>
                                                                    <div className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
                                                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                                                        <div className="flex-1">
                                                                            <p className="font-medium text-sm">
                                                                                {result.name}: Failed
                                                                            </p>
                                                                            {result.status && (
                                                                                <p className="text-xs text-gray-500">Status: {result.status}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader className={"space-y-5"}>
                                                                        <DialogTitle>{result.name} test</DialogTitle>
                                                                    </DialogHeader>
                                                                    <DialogDescription>
                                                                        <p><b>Returned status:</b> {result.status}</p>
                                                                        <p><b>Expected status:</b> {result.expectedStatus}</p>
                                                                        <Separator className={"my-2"}/>
                                                                        {result.hint && <p><b>Hint:</b> {result.hint}</p>}
                                                                        <Separator className={"my-2"}/>
                                                                        <p><b>Returned body:</b> {result.body}</p>
                                                                        {result.expectedBody && <p><b>Expected body:</b> {result.expectedBody}</p>}
                                                                    </DialogDescription>
                                                                </DialogContent>
                                                            </Dialog>
                                                        ) : (
                                                            <div key={result.id} className="flex items-start gap-3 p-3 rounded-lg border">
                                                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                                                <div className="flex-1">
                                                                    <p className="font-medium text-sm">
                                                                        {result.name}: Passed
                                                                    </p>
                                                                    {result.status && (
                                                                        <p className="text-xs text-gray-500">Status: {result.status}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            }
                            <Button onClick={() => setNextLesson()} disabled={!nextButtonActivated}>
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
                            {markdownContent}
                        </ReactMarkdown>
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}