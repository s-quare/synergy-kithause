import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="NotFound px-5 text-center d-flex bg-white"
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
      }}
    >
      <div>
        <img src="images/not-found.gif" alt="" style={{ height: 200 }} />
      </div>
      <div>
        <p className="fw-bolder">PAGE NOT FOUND</p>
        <p className="f-14">
          You might have strolled beyond the universe, But let's bring you back.
        </p>

        <button
          onClick={() => navigate(-1, { replace: true })}
          className="px-5 d-block mx-auto rounded-pill btn btn-light f-12 mt-5"
        >
          Return To Previous Page
        </button>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="px-4 d-block mx-auto rounded-pill btn bg-dutch border-0 f-12 mt-4"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
