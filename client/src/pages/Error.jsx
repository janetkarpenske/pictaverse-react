import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  //returns an error object
  //if you threw a Response then it will have an error.status field
  //if you threw an object you created that property will not exist, it will just be your object
  const error = useRouteError();
  //error.status


  let title = "An error occurred!";
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }
  if (error.status === 404) {
    title = 'Not found!'
    message = 'Oopsies, could not find resource or page'
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}