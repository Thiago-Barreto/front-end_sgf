import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import one from "@/assets/1.png";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/api/auth/signIn";
import { LoaderIcon } from "lucide-react";
import { authSchema, type authType } from "@/schema/auth";
import { TypeToNumber } from "@/utils/formatted/type/number";

export default function SignIn({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const methods = useForm<authType>({
    resolver: zodResolver(authSchema),
  });
  const { register, handleSubmit, setValue } = methods;
  const { mutateAsync, isPending } = useSignIn();

  const handleSignIn = async (data: authType) => {
    await mutateAsync(data);
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-stone-200 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <FormProvider {...methods}>
                <form className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                      <p className="text-muted-foreground text-balance">
                        Entre na sua conta do S.G.F
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="login">Matrícula</Label>
                      <Input
                        id="login"
                        type="text"
                        {...register("UserID")}
                        onChange={(event) =>
                          TypeToNumber(event, setValue, "UserID")
                        }
                        placeholder="Ex: 11286"
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        {...register("AccessPassword")}
                        placeholder="****"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      onClick={handleSubmit((data) => handleSignIn(data))}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <p className="flex items-center gap-1">
                          Verificando dados{" "}
                          <LoaderIcon className="animate-spin" />
                        </p>
                      ) : (
                        "Acessar"
                      )}
                    </Button>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Ainda não possui uma conta ?
                      </span>
                    </div>
                    <p className="text-center">
                      Fale com um responsável do seu setor.
                    </p>
                  </div>
                </form>
              </FormProvider>
              <div className="bg-muted relative hidden md:block">
                <img
                  src={one}
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
