export default function (args: $TSFixMe) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const lang = "hi-IN";
    // @ts-expect-error TS(2345): Argument of type '{ weekday: string; year: string;... Remove this comment to see the full error message
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