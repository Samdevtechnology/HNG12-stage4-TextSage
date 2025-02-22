import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWarningStore } from "@/store/warning";

const Warning = () => {
  const { hasSeenWarning, setHasSeenWarning } = useWarningStore();

  return (
    <AlertDialog open={!hasSeenWarning} onOpenChange={setHasSeenWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center mb-2">
            ⚠️ Experimental AI Notice
          </AlertDialogTitle>
          <div className="space-y-2">
            <AlertDialogDescription className="text-base text-inherit font-normal">
              Welcome to{" "}
              <span className="logo text-xl font-bold">
                <span className="text-[#907AD6] dark:text-[#DABFFF]">Text</span>
                <span className="text-[#FA9F42] dark:text-[#FCAF58]">Sage</span>
              </span>
              ! This application utilizes Chrome's built-in AI (powered by
              Gemini Nano), which is still in the experimental phase.
            </AlertDialogDescription>
            <AlertDialogDescription className="text-lg text-inherit text-left font-medium">
              For optimal experience:
            </AlertDialogDescription>
            <div className="pl-6">
              <ul className="list-disc text-left space-y-1">
                <li>Use the latest version of Chrome browser</li>
                <li>
                  Prefer desktop/laptop use (Mobile experience currently has
                  limited functionality)
                </li>
              </ul>
              <div className="mt-4 text-center">
                <p>🎉 Enjoy the Experience!</p>
              </div>
            </div>
            <AlertDialogDescription className="text-sm text-center text-muted-foreground mt-4">
              By continuing, you acknowledge the experimental nature of this
              application.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Warning;
