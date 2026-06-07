import AppSidebar from "@/components/learning/sidebar/AppSidebar.tsx";
import ReactMarkdown from "react-markdown";
import lessonData from "@/assets/lessons/lessons.json"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, Bot} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import type { currentLesson, category} from "@/assets/lessons/lessonObjects.ts";


export default function Learning() {
    const categories = lessonData.categories as category[];
    const [currentLesson, setCurrentLesson] = useState<currentLesson>();
    const [markdownContent, setMarkdownContent]= useState("");
    const [nextButtonActivated, setNextButtonActivated] = useState(true);

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

    return (
        <>
            <SidebarProvider>
                <AppSidebar setLesson={setLesson} typedCategories={categories} currentLesson={currentLesson}/>
                <main className={"p-5 w-full"}>
                    <div className={"flex flex-row justify-between items-center w-full"}>
                        <SidebarTrigger className={"p-2 bg-gray-100 rounded-sm mb-5"}/>
                        <div className={"flex flex-row gap-2"}>
                            <Button className={"bg-gray-800"}>
                                <Bot/>
                                Check
                            </Button>
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