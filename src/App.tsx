import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MyForm, myFormSchema } from "./schemas";
import { nameOnlyFieldData, ramenFieldData } from "./data";
import { ReactNode, useState } from "react";

export default function App() {
  const [onlyName, setOnlyName] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    resetField,
  } = useForm<MyForm>({
    resolver: zodResolver(myFormSchema({ onlyName })),
  });

  const [formData, setFormData] = useState<MyForm | null>(null);

  const onSubmit = handleSubmit((data) => {
    setFormData(data);
  });

  return (
    <Grid root>
      {formData && (
        <Group>
          <Title text="送信データ" />

          {JSON.stringify(formData)}
        </Group>
      )}

      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gap: ".5rem",
        }}
      >
        <Title text="フォーム" />

        <Group>
          <Title text="ラーメン" />

          <Group>
            <Title text="味を選んでください" />

            {errors.ramen && errors.ramen.name && (
              <ErrorMessage text={errors.ramen.name.message} />
            )}

            {ramenFieldData.map((ramenField) => {
              return (
                <Grid key={ramenField.name}>
                  <Check
                    type="radio"
                    registerReturn={register("ramen.name", {
                      onChange: () => {
                        resetField("ramen.option1");
                        resetField("ramen.option2");

                        setOnlyName(() => {
                          return nameOnlyFieldData.some(
                            (v) => v.name === watch("ramen.name")
                          );
                        });
                      },
                    })}
                    value={ramenField.name}
                  />

                  {ramenField.options1 &&
                    watch("ramen.name") === ramenField.name && (
                      <Group>
                        <Title text="量を選んでください" />

                        {errors.ramen && errors.ramen.option1 && (
                          <ErrorMessage text={errors.ramen.option1.message} />
                        )}

                        {ramenField.options1.map((option) => {
                          return (
                            <Grid key={option}>
                              <Check
                                type="radio"
                                registerReturn={register("ramen.option1", {
                                  onChange: () => {
                                    resetField("ramen.option2");
                                  },
                                })}
                                value={option}
                              />

                              {ramenField.options2 &&
                                watch("ramen.option1") === option && (
                                  <Group>
                                    <Title text="トッピングを選んでください" />

                                    {errors.ramen && errors.ramen.option2 && (
                                      <ErrorMessage
                                        text={errors.ramen.option2.message}
                                      />
                                    )}

                                    {ramenField.options2.map((option2) => {
                                      return (
                                        <Grid key={option2}>
                                          <Check
                                            type="checkbox"
                                            registerReturn={register(
                                              "ramen.option2"
                                            )}
                                            value={option2}
                                          />
                                        </Grid>
                                      );
                                    })}
                                  </Group>
                                )}
                            </Grid>
                          );
                        })}
                      </Group>
                    )}
                </Grid>
              );
            })}
          </Group>
        </Group>

        <button style={{ cursor: "pointer" }}>送信</button>
      </form>
    </Grid>
  );
}

function Title({ text }: { text: string }) {
  return <p style={{ margin: 0 }}>{text}</p>;
}

function Check({
  registerReturn,
  value,
  type,
}: {
  registerReturn: UseFormRegisterReturn;
  value: string;
  type: "radio" | "checkbox";
}) {
  return (
    <label style={{ display: "block", cursor: "pointer" }}>
      <input type={type} {...registerReturn} value={value} />
      {value}
    </label>
  );
}

function Group({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        padding: "1rem",
        gap: ".5rem",
        backgroundColor: "rgba(0, 0, 0, .05)",
      }}
    >
      {children}
    </div>
  );
}

function Grid({ children, root }: { children: ReactNode; root?: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gap: ".5rem",
        ...(root ? { padding: "1rem" } : {}),
      }}
    >
      {children}
    </div>
  );
}

function ErrorMessage({ text }: { text?: string }) {
  return <p style={{ color: "red", margin: "0" }}>{text}</p>;
}
