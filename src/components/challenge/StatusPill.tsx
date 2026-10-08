// Status pill a badge for each post that shows their status idea, writing, draft, filmding, editing, scheduled, posted diffrent colors

import type { PostStatus } from "../../types";
import { STATUS_LABELS } from "../../types";

const statusClasses: Record<PostStatus, string> = {
  idea: 'bg-gray-100 text-gray-700',
  draft: 'bg-pink-100 text-pink-800',
  writing: 'bg-sky-100 text-sky-800',
  filming: 'bg-violet-100 text-violet-800',
  editing: 'bg-orange-100 text-orange-800',
  scheduled: 'bg-blue-100 text-blue-100',
  posted: 'bg-green-100 text-green-800',
};

interface StatusPillProps {
  status: PostStatus;
}

function StatusPill({ status }: StatusPillProps) {
  return(
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

export default StatusPill;