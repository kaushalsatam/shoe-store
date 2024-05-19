import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <>
      <div id="admin-footer" className="h-48 flex justify-center items-center bg-cyan-100 rounded-2xl my-8">
        <GitHubIcon />
        <LinkedInIcon />
      </div>
    </>
  )
}

export default Footer
