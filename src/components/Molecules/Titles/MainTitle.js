import { MainHeading, SubHeading } from "../../Atoms";
export const MainTitle = ({ className }) => {
  return (
    <div className={className ? className : ""}>
      <MainHeading text={"Join our stock community!"} />
      <SubHeading
        text={
          "Download free photos and videos powered by the best photographers"
        }
      />
    </div>
  );
};
