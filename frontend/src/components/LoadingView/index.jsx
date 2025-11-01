import { TailSpin } from "react-loader-spinner";

const LoadingView = () => (
  <div className="no-data-view">
    <TailSpin width={50} height={50} color="#ff6200" />
  </div>
);

export default LoadingView;
