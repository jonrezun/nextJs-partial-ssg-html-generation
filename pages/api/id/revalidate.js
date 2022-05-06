export default async function handler(req, res) {
  const id = req.query.id;
  // Check for secret to confirm this is a valid request
  //   if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  try {
    if (!id) throw "not id";
    await res.unstable_revalidate(`/id/${id}/`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({ type: "error", text: err });
  }
}
