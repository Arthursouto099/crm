import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "My App",
    description: "Descrição do app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br" suppressHydrationWarning>
            <body 
                cz-shortcut-listen="true">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                  
                              {children}
                  
                    <Toaster 
                    
                    position="top-right"
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}