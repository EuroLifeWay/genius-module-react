// npm install react-syntax-highlighter
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function FuncCode() {
  const funcCode = `function MyFunctionComponent() {
  const myName = 'Serhii Voloshyn';
  return (
      <>
        <h1>{myName}</h1>
      </>
    );
  }`;

  return (
    <>
      <p>
        <b>Functional approach:</b>
      </p>
      <SyntaxHighlighter language="javascript" style={atomOneDark}>
        {funcCode.trim()}
      </SyntaxHighlighter>
    </>
  );
}
