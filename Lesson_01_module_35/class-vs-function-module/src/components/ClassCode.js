import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function ClassCode() {
  const classCode = `class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "I'm from Ukraine" };
  }
  render() {
    return <p>{this.state.country}</p>;
  }
}`;

  return (
    <>
      <p>
        <b>Class approach:</b>
      </p>
      <SyntaxHighlighter language="javascript" style={atomOneDark}>
        {classCode}
      </SyntaxHighlighter>
    </>
  );
}
