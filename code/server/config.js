import path from "path";

export const ROOT = path.resolve("code");

export const CONFIG = {
    root: ROOT,
    public: path.join(ROOT, "public"),
    data: (filename) => path.join(ROOT, "data", filename),
};
