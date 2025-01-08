import { Link } from "react-router-dom";
import CaseComponent from '../../components/Case'
import {Case} from '../../app/types'
import Title from '../../components/Title'

interface CaseListingProps {
  name: string,
  description?: string,
  cases: Case[]
}

const CaseListing: React.FC<CaseListingProps> = ({
  name,
  description,
  cases
}) => {
  console.log('CaseListing props:', name, description, cases);
  console.log('Cases found:', cases);

  return (
    <div className="flex flex-col items-center justify-center max-w-[1600px]">
      <Title title={name} />
      {description && <div className="text">{description}</div>}
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:flex-wrap">
        {cases && cases.length > 0 ? (
          console.log('Mapping cases...'),
          cases.map((item) => {
            console.log('Mapping case:', item);
            if (item.id) {
              console.log('Case has id:', item.id);
              return (
                <Link to={`/case/${item.id}`} key={item.id}>
                  <CaseComponent
                    title={item.title}
                    image={item.image}
                    price={item.price}
                  />
                  
                </Link>
              );
            } else {
              console.log('Case has no id');
              return null;
            }
          })
        ) : (
          console.log('No cases to map'),
          <div>No cases found</div>
        )}
      </div>
    </div>
  );
}

export default CaseListing;