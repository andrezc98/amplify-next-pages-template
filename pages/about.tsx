import { withAuthenticator } from '@aws-amplify/ui-react';
import CustomAuthenticator from '@/components/CustomAuthenticator';

function About() {
    return (
        <CustomAuthenticator>
          <div>About</div>
        </CustomAuthenticator>
      );
}

export default About;