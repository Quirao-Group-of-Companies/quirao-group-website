import { Axiom } from '@axiomhq/js';

const token = process.env.NEXT_PUBLIC_AXIOM_TOKEN;
if (!token) {
  throw new Error('Missing NEXT_PUBLIC_AXIOM_TOKEN environment variable');
}
const axiomClient = new Axiom({
  token: token,
});
export default axiomClient;
