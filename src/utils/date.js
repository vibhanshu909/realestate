export default function (args) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const lang = "hi-IN";
    return new Date(args).toLocaleDateString(lang, options);
}
export function getDate(now = new Date()) {
    now = new Date(now);
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    return y + "-" +
        (m < 10 ? "0" + m : m) + "-" +
        (d < 10 ? "0" + d : d);
}