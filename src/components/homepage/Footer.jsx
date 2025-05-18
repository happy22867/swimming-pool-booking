export default function Footer() {
  return (
    <footer id="contact" className="bg-indigo-900 text-white text-center py-6 mt-12">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} SwimmingGo. All rights reserved.
      </p>
      <p className="text-sm">
        Contact us:{" "}
        <a href="mailto:support@swimminggo.in" className="underline">
          support@swimminggo.in
        </a>
      </p>
    </footer>
  );
}
