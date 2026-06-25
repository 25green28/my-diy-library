import AppSidebar from "@/components/learning/sidebar/AppSidebar.tsx";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import lessonData from "@/assets/lessons/lessons.json"
import { Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button} from "@/components/ui/button.tsx";
import { ArrowRight, Bot, Loader2, CheckCircle2, XCircle, ServerCrash, Copy, Check } from "lucide-react";
import { useCallback, useEffect, useState, useMemo } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { useSearchParams } from "react-router-dom";
import type { currentLesson, category } from "@/assets/lessons/lessonObjects.ts";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Separator} from "@/components/ui/separator.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type lessonInfo = {
    category: number,
    lesson: number
}

export default function Learning() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [markdownContent, setMarkdownContent]= useState("");
    const [isLoadingMarkdown, setIsLoadingMarkdown] = useState(false);
    const [markdownError, setMarkdownError] = useState<string | null>(null);
    const [nextButtonActivated, setNextButtonActivated] = useState(true);
    const [isRunningTests, setIsRunningTests] = useState(false);
    const [testResults, setTestResults] = useState<Array<{id: number, name: string, passed: boolean, status?: number, expectedStatus?: number, expectedBody?: string, hint?: string, body?: string, error?: string}>>([]);
    const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("lang");
        return savedLanguage ? JSON.parse(savedLanguage) : "en";
    });


    const categories = lessonData.categories as category[];
    const savedLessonInfo = JSON.parse(localStorage.getItem("lessonInfo") || "{}");
    const categoryParam = parseInt(searchParams.get("category") || savedLessonInfo.category ||'0');
    const lessonParam = parseInt(searchParams.get("lesson") || savedLessonInfo.lesson || '0');
    const currentLesson: currentLesson | undefined = useMemo(() => {
        const lessonInformation:lessonInfo = {category: categoryParam, lesson: lessonParam};
        localStorage.setItem("lessonInfo", JSON.stringify(lessonInformation));
        return categories[categoryParam]?.lessons[lessonParam]
            ? { parentCategory: categoryParam, data: categories[categoryParam].lessons[lessonParam]}
            : undefined;
    }, [categories, categoryParam, lessonParam]);

    const fetchMarkdown = useCallback(async () => {
        if (currentLesson === undefined) return;
        setIsLoadingMarkdown(true);
        setMarkdownError(null);
        setMarkdownContent("");
        try {
            const lessonPath = currentLesson.data.paths?.[currentLanguage] || currentLesson.data.path;
            const content = await import(lessonPath + "?raw");
            setMarkdownContent(content.default);
        } catch {
            setMarkdownError("Failed to load lesson content");
        } finally {
            setIsLoadingMarkdown(false);
        }
    }, [currentLesson, currentLanguage]);

    useEffect(() => {
        const hasQueryParams = searchParams.has('category') && searchParams.has('lesson');
        const hasSavedLesson = savedLessonInfo.category !== undefined && savedLessonInfo.lesson !== undefined;

        if (!hasQueryParams && !hasSavedLesson) {
            setLesson(0, 0);
        }
    }, [searchParams, savedLessonInfo]);

    useEffect(() => {
        localStorage.setItem("lang", JSON.stringify(currentLanguage))
    }, [currentLanguage]);

    useEffect(() => {
        setTimeout(() => fetchMarkdown(), 0);
    }, [fetchMarkdown]);

    const setLesson = useCallback((category: number, lesson: number) => {
        setSearchParams({ category: category.toString(), lesson: lesson.toString() })
        setNextButtonActivated(doesNextLessonExist(category, lesson))
    }, [setSearchParams]);

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
        if (!currentLesson) return;
        let category = currentLesson.parentCategory;
        let lesson = categories[category].lessons[lessonParam + 1];
        if (lesson === undefined) {
            category++;
            if (category >= categories.length) {
                return;
            }
            lesson = categories[category].lessons[0];
            if (lesson === undefined) {
                return;
            }
        }

        if (doesNextLessonExist(category, lesson.id)) {
            setNextButtonActivated(true);
        } else {
            setNextButtonActivated(false);
        }

        setLesson(category, lesson.id);
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
                        name: test.name,
                        passed: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    };
                }
            })
        );

        setTestResults(results);
        setIsRunningTests(false);
    }

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedCodeId(id);
            setTimeout(() => setCopiedCodeId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    return (
        <>
            <SidebarProvider>
                <AppSidebar setLesson={setLesson} typedCategories={categories} currentLesson={currentLesson} currentLanguage={currentLanguage}/>
                <main className={"p-5 w-full overflow-x-hidden"}>
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
                        {currentLesson === undefined ? (
                            <div className="flex items-center justify-center py-16">
                                <p className="text-gray-500 text-lg">Lesson not found</p>
                            </div>
                        ) : isLoadingMarkdown ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
                            </div>
                        ) : markdownError ? (
                            <div className="flex flex-col gap-7.5 w-full items-center justify-center py-16">
                                <ServerCrash/>
                                <p className="text-gray-700 text-lg">{markdownError}</p>
                            </div>
                        ) : (
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ ...props }) => <h1 {...props} className="text-3xl font-bold mb-6 mt-8" />,
                                    h2: ({ ...props }) => <h2 {...props} className="text-2xl font-bold mb-5 mt-6" />,
                                    h3: ({ ...props }) => <h3 {...props} className="text-xl font-bold mb-4 mt-4" />,
                                    p: ({ ...props }) => <p {...props} className="text-base leading-relaxed mb-4" />,
                                    ul: ({ ...props }) => <ul {...props} className="list-disc mb-4 space-y-2 pl-6" />,
                                    ol: ({ ...props }) => <ol {...props} className="list-decimal mb-4 space-y-2 pl-6" />,
                                    li: ({ ...props }) => <li {...props} className="text-base leading-relaxed" />,
                                    strong: ({ ...props }) => <strong {...props} className="font-semibold" />,
                                    blockquote: ({ ...props }) => <blockquote {...props} className="border-l-4 border-gray-300 pl-4 py-2 mb-4 bg-gray-50" />,
                                    a: ({ ...props }) => <a {...props} className="text-blue-600 hover:underline" />,
                                    table: ({ ...props }) => <table {...props} className="w-full mb-4 border-collapse border border-gray-300" />,
                                    thead: ({ ...props }) => <thead {...props} className="" />,
                                    tbody: ({ ...props }) => <tbody {...props} className="" />,
                                    tr: ({ ...props }) => <tr {...props} className="" />,
                                    th: ({ ...props }) => <th {...props} className="px-4 py-2 text-left font-semibold border border-gray-300 bg-gray-50" />,
                                    td: ({ ...props }) => <td {...props} className="px-4 py-2 border border-gray-300" />,
                                    details: ({ ...props }) => <details {...props} className="mb-4" />,
                                    summary: ({ ...props }) => <summary {...props} className="cursor-pointer hover:text-blue-600" />,
                                    code(props) {
                                        const { className, children, ...rest } = props;
                                        const match = /language-(\w+)/.exec(className || '');
                                        const codeId = Math.random().toString(36).substring(7);
                                        const codeString = String(children).replace(/\n$/, '');

                                        return match ? (
                                            <div className="relative group">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => copyToClipboard(codeString, codeId)}
                                                >
                                                    {copiedCodeId === codeId ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                </Button>
                                                <SyntaxHighlighter
                                                    style={oneLight}
                                                    language={match[1]}
                                                >
                                                    {codeString}
                                                </SyntaxHighlighter>
                                            </div>
                                        ) : (
                                            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono break-words" {...rest}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {markdownContent}
                            </ReactMarkdown>
                        )}
                    </div>
                    <div className={"pt-10 w-full flex justify-center"}>
                        <Select defaultValue={"option1"} value={currentLanguage} onValueChange={setCurrentLanguage}>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent position={"item-aligned"}>
                                <SelectGroup>
                                    <SelectItem value="en"><img src="/flags/us.svg" alt="US" width={"20"}/>English</SelectItem>
                                    <SelectItem value="pl"><img src="/flags/pl.svg" alt="PL" width={"20"}/>Polish</SelectItem>
                                    <SelectItem value="it"><img src="/flags/it.svg" alt="IT" width={"20"}/>Italian</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}