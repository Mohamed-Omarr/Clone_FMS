import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types";

function Header({prop}:{prop:User}) {
  return (
    <header className="flex items-center justify-between p-6 border-b bg-background">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground text-balance">
          FMS
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">
          Best Application
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {prop.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            {/* Avatar on the left */}
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.Image} alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                fallback
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {user.Name}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.Email}
              </span>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
