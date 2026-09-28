import { formatDatetime } from "@/utils/format-datetime";

type PostDateProps = {
  dateTime: string;
};
export default function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      className="text-slate-600  text-sm/tight"
      dateTime={formatDatetime(dateTime)}
    >
      {" "}
      {formatDatetime(dateTime)}
    </time>
  );
}
