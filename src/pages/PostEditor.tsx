// page to create or edit a post  /:challengeId/posts/new?day=3 create bs /:challengeId/posts/:postsId edit

import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import useChallenge from "../hooks/useChallenge";
import usePost from "../hooks/usePost";
import { useState } from "react";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";
import type { PostFields } from "../types";

import api, { getErrorMessage } from "../api/client";
import PostForm from "../components/plan/PostForm";
import Button from "../components/ui/Buttons";



function PostEditor() {
  // postId
  const { challengeId, postId } = useParams<{ challengeId: string; postId?: string }>();
  const isEditing = Boolean(postId);

  // useSearchParams 
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();

  // load challenges and the post to edit
  const challengeData = useChallenge(challengeId);
  const postData = usePost(challengeId, postId)

  const [isDeleting, setIsDeleting ] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // redirect after svae cancel or delete
  const planUrl = `/challenges/${challengeId}`;

  // save handler function
  async function handleCreate(postData: PostFields) {
    await api.post(`/challenges/${challengeId}/posts`, postData);
    navigate(planUrl);
  }

  async function handleUpdate(postData: PostFields) {
    await api.put(`/challenges/${challengeId}/posts/${postId}`, postData)
    navigate(planUrl)
  }

  // delete handler function

  async function handleDelete() {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;

    try {
      setIsDeleting(true); setDeleteError(''); await api.delete(`/challenges/${challengeId}/posts/${postId}`); navigate(planUrl, { replace: true });
    } catch (error) {
      setDeleteError(getErrorMessage(error));setIsDeleting(false);
    }
  }
  // loading & error states
  if (challengeData.loading || postData.loading) {
    return <Loader label="Loading post..." />; 
  } 
    
    const { challenge } = challengeData; 
    
    const loadError = challengeData.error || postData.error; 
     
    if (loadError || !challenge || (isEditing && !postData.post)) { 
      return ( 
        <ErrorMessage 
          message={loadError || 'Post not found.'}
          onRetry={() => { challengeData.refetch(); postData.refetch();
         }} /> 
      );
  }

  // pre pick day for NEW post 
  const dayFromUrl = Number (searchparams.get('day'))
  const defaultDay = 
    Number.isInteger(dayFromUrl) && dayFromUrl >= 1 && dayFromUrl <= challenge.lengthInDays ? dayFromUrl : 1;

    // edit mode
    const { post } = postData;
    const initialValues: PostFields | undefined = post ? {
      dayNumber: post.dayNumber,
      postTime: post.postTime,
      title: post.title,
      caption: post.caption,
      platform: post.platform,
      contentType: post.contentType,
      status: post.status,
      link: post.link
    }
   : undefined; 
  
  return  (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <Link to={planUrl} className="text-sm font-semibold text-brand-dark hover:underline">
          <span aria-hidden="true">👈🏾 </span> {challenge.challengeName}
        </Link>
        <h1 className="p-8 text-3xl font-extra bold">{isEditing ? 'Edit post' : 'New post' }</h1>

        <PostForm 
          challenge={challenge}
          initialValues={initialValues}
          defaultDay={defaultDay}
          submitLabel={isEditing ? 'Save changes' : 'Add post'}
          cancelTo={planUrl}
          onSubmit={isEditing ? handleUpdate : handleCreate }
        />
      </div>

      {/* //  delete  */}
      {isEditing && (
        <section aria-labelledby="delete-post-heading" className="rounded-3xl border border-red-200 bg-red-50 p-6"> 
          <h2 id="delete-post-heading" className="text-lg font-bold text-red-800">Delete post</h2>

          <p className="mt-1 mb-4 text-sm rext-rd-700">This remove the post form your plan</p>

          {deleteError && (
            <p role="alert" className="mb-4 text-sm text-red-700">{deleteError}</p>
          )}

          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Delete post
          </Button>
        </section>
      )}
    </div>
  );
}

export default PostEditor;