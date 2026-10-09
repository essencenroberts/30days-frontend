// form for creating and editing a challenge

import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../api/client";
import type { NewChallengeData } from "../../types";
import { formatDate, getTodayString } from "../../utils/dates";
import Button from "../ui/Buttons";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";


// form values type strings
type FormValues = {
  challengeName: string;
  description: string;
  startDate: string;
  lengthInDays: string;
  postPerDay: string;
};

// form errors type
type FormErrors = Partial<FormValues>;

// dropdown choices
const LENGTH_CHOICES = [30, 60, 90];

const POSTS_PER_DAY_CHOICES = Array.from({ length: 10 }, (_, index) => index + 1);

const DESCRIPTION_MAX = 300;

// function to validate
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  const name = values.challengeName.trim();
  if (name.length < 3) {
    errors.challengeName = 'Challenge name must be at least 3 characters';
  } else if (name.length > 60) {
    errors.challengeName = 'Challenge name must be 60 characters or less.';
  }

  if (values.description.trim().length > DESCRIPTION_MAX) {
    errors.description = `Description must be ${DESCRIPTION_MAX} characters or less`
  }

  // start date required
  if (!values.startDate) {
    errors.startDate = 'Please pick a start date.'
  }

  return errors;
}


// challenge end date function
function getEndDate(startDate: string, lengthInDays: number): string {
  if (!startDate) return '';

  const end = new Date(`${startDate}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + lengthInDays - 1);

  return formatDate(end.toISOString());
}

// challenge form props 
interface ChallengeFormProps {
  // starting value
  initialValues?: NewChallengeData;
  submitLabel: string;
  // cancel
  cancelTo: string;

  onSubmit: (challengeData: NewChallengeData) => Promise<void>;
}

// function
function ChallengeForm({ initialValues, submitLabel, cancelTo, onSubmit }: ChallengeFormProps) {

  // starting values useState
  const [values, setValues] = useState<FormValues>({
    challengeName: initialValues?.challengeName ?? '',
    description: initialValues?.description ?? '',
    startDate: initialValues?.startDate ?? getTodayString(),
    lengthInDays: String(initialValues?.lengthInDays ?? 30),
    postPerDay: String(initialValues?.postPerDay ?? 1),

  });

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // change handler
  function updateField(field: keyof FormValues, value: string) {
    setValues({ ...values, [field]: value });
  }

  // preview numbers for challenge
  const lengthNumber = Number(values.lengthInDays);
  const perDayNumber = Number(values.postPerDay);
  const totalPosts = lengthNumber * perDayNumber;
  const endDate = getEndDate(values.startDate, lengthNumber);

  // dropdown options
  const lengthOptions = [...new Set([...LENGTH_CHOICES, lengthNumber])]
    .sort((a, b) => a-b)
    .map((days) => ({ value: String(days), label: `${days} days` }));

  const perDayOptions = POSTS_PER_DAY_CHOICES.map((count) => ({
    value: String(count),
    label: count === 1 ? '1 post per day' : `${count} posts per day`,
  }));

  // handleSubmit
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    //  stop page reload
    event.preventDefault();
    setServerError('');

    // check errors
    const errors = validate(values);
    setFieldErrors(errors);
    // stop errors
    if (Object.keys(errors).length > 0) return;
    
    //
    const challengeData: NewChallengeData = {
      challengeName: values.challengeName.trim(),
      description: values.description.trim(),
      startDate: values.startDate,
      lengthInDays: lengthNumber,
      postPerDay: perDayNumber,
    }; 

    try {
      setIsSubmitting(true)

      await onSubmit(challengeData)
    } catch (error) {
      //backend error
      setServerError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input 
        label="Challenge name"
        placeholder="30 Reels in 30 Days"
        value={values.challengeName}
        onChange={(event) => updateField('challengeName', event.target.value)}
        error={fieldErrors.challengeName}
      />

      <Textarea 
        label="Description"
        placeholder="Whats this challenge for? Brand awareness, driving traffic to your website, launching a new product or server...?"
        value={values.description}
        onChange={(event) => updateField('description', event.target.value)}
        error={fieldErrors.description}
        maxLength={DESCRIPTION_MAX}
        showCount
      />

      <Input 
        label="Start date"
        type="date"
        value={values.startDate}
        onChange={(event) => updateField('startDate', event.target.value)}
        error={fieldErrors.startDate}
      />

      <div>
        <Select 
          label="Length"
          options={lengthOptions}
          value={values.lengthInDays}
          onChange={(event) => updateField('lengthInDays', event.target.value)}
        />

         <Select 
          label="Posts per day"
          options={perDayOptions}
          value={values.postPerDay}
          onChange={(event) => updateField('postPerDay', event.target.value)}
        />
      </div>

      {/* summary */}
      <p aria-live="polite" className="rounded-xl bg-brand-light px-4 py-4 text-sm text-ink">
        <span className="font-bold">{totalPosts} post total</span>
        {endDate && <> ends {endDate}</>}
      </p>

      {/* errors */}
      {serverError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      )}

      {/* buttons style Links */}
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
  );
}
export default ChallengeForm;