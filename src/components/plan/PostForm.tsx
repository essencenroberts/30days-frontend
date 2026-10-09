// form to create and edit post similar to challengeform
import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../api/client";
import type { Challenge, ContentType, Platform, PostFields, PostStatus } from "../../types";
import { CONTENT_TYPES, PLATFORMS, POST_STATUSES, STATUS_LABELS  } from "../../types";
import { formatDate, getDayDate} from "../../utils/dates";
import Button from "../ui/Buttons";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

//form values type string
type FormValues = {
  dayNumber: string;
  postTime: string;
  title: string;
  caption: string;
  platform: string;
  contentType: string;
  status: PostStatus;
  link: string;
};

// form errors type
type FormErrors = Partial<FormValues>;

// chracater limits
const TITLE_MAX = 120;
const CAPTION_MAX = 10000;

// validate function
function validate(values: FormValues): FormErrors {
  
  const errors: FormErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Please give this posts a title.';
  } else if (values.title.trim().length > TITLE_MAX) {
    errors.title = `Tite must be ${TITLE_MAX} chatacaters or less'`
  }

  // platform and content type start empty ("")  check errors
  if (!PLATFORMS.includes(values.platform as Platform)) {
    errors.platform = 'Please choose a platform';
  }
  if (!CONTENT_TYPES.includes(values.contentType as ContentType)) {
    errors.contentType = 'Please choose a content type';
  }

  // link is an optional field but must start with https://
  if (values.link.trim() && !/^https:\/\/\S+$/.test(values.link.trim())) {
    errors.link = 'Link must start with https://'
  }

  return errors;
}

// post form props - form needs a challenge to build the Day
interface PostFormProps {
  challenge: Challenge;
  initialValues?: PostFields;
  defaultDay?: number;
  submitLabel: string;
  cancelTo: string;
  onSubmit: (payload: PostFields) => Promise<void>;
}

// function
function PostForm({ challenge, initialValues, defaultDay = 1, submitLabel, cancelTo, onSubmit }: PostFormProps) {
  
  // useState starting values in edit mode (poost fields)
  const [values, setValues] = useState<FormValues>({
    dayNumber: String(initialValues?.dayNumber ?? defaultDay),
    postTime: initialValues?.postTime ?? '',
    title:  initialValues?.title ?? '',
    caption:  initialValues?.caption ?? '',
    platform:  initialValues?.platform ?? '',
    contentType: initialValues?.contentType ?? '',
    status:  initialValues?.status ?? 'idea',
    link:  initialValues?.link ?? '',
  
  });

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // change handler 
  function updateField(field: keyof FormValues, value: string) {
    setValues({ ...values, [field]: value });
  }

  // dropdown options
const dayOptions = Array.from({ length: challenge.lengthInDays }, (_, index) => {
  const day = index + 1;
  return {
    value: String(day),
    label: `Day ${day} ${formatDate(getDayDate(challenge.startDate, day))}`
  }
});

const platformOptions = PLATFORMS.map((platform) => ({ value: platform, label: platform }));
const contentTypeOptions = CONTENT_TYPES.map((type) => ({ value: type, label: type }));
const statusOptions = POST_STATUSES.map((status) => ({ value: status, label: STATUS_LABELS[status] }));


// handleSubmit
async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  // stop page reload
  event.preventDefault();
  setServerError('');

  // check errors 
  const errors = validate(values);
  setFieldErrors(errors);
  // stop errors
  if (Object.keys(errors).length > 0) return;

  // backend validat 
  const postData: PostFields = {
    dayNumber: Number(values.dayNumber),
    postTime: values.postTime,
    title: values.title.trim(),
    caption: values.caption.trim(),
    platform: values.platform as Platform,
    contentType: values.contentType as ContentType,
    status: values.status as PostStatus,
    link: values.link.trim(),
  };

  try {
    setIsSubmitting(true);
    await onSubmit(postData);
  } catch (error) {
    // show backend error
    setServerError(getErrorMessage(error));

  } finally {
    setIsSubmitting(false)
  }
}

  return(
    <form onSubmit={handleSubmit} noValidate>
     
     <div>
      {/*  day */}
      <Select 
        label="Day"
        options={dayOptions}
        value={values.dayNumber}
        onChange={(event) => updateField('dayNumber', event.target.value)}
      />
      {/* time  */}
      <Input 
        label="Time (optional)"
        type="time"
        value={values.postTime}
        onChange={(event) => updateField('postTime', event.target.value)}
        helperText="Helps order multiples posts on the same day"
      />
     </div>

    {/* title platform content type */}
    <Input 
      label="Title"
      type="Morning routine reel"
      value={values.title}
      onChange={(event) => updateField('title', event.target.value)}
      error={fieldErrors.title}
      maxLength={TITLE_MAX}
    />

    <div>
      <Select 
        label="Platform"
        placeholder="Choose a platform"
        options={platformOptions}
        value={values.platform}
        onChange={(event) => updateField('platform', event.target.value)}
        error={fieldErrors.platform}
      />

      <Select 
        label="Content type"
        placeholder="Choose a type"
        options={contentTypeOptions}
        value={values.contentType}
        onChange={(event) => updateField('contentType', event.target.value)}
        error={fieldErrors.contentType}
      />
    </div>

      {/* Textarea big versionfor lon-form written post */}
      <Textarea 
        label="Caption or script (optional)"
        placeholder="Write your caption, hook, or full script..."
        rows={8}
        value={values.caption}
        onChange={(event) => updateField('caption', event.target.value)}
        maxLength={CAPTION_MAX}
        showCount
      />

     {/* progress */}
     <Select 
        label="Status"
        options={statusOptions}
        value={values.status}
        onChange={(event) => updateField('status', event.target.value)}
      />

      {/* link */}
      <Input 
        label="Live link (optional)"
        type="url"
        placeholder="https://"
        value={values.link}
        onChange={(event) => updateField('link', event.target.value)}
        error={fieldErrors.link}
        helperText="Add the link once the post is live"
      />

      {/* errors */}
      {serverError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      )}

      {/* buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          to={cancelTo}
          className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-ink px-5 text-sm font-semibold hover:bg-gray-100"
        >Cancel</Link>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default PostForm;