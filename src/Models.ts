import { DomusModelSettings } from "./App";
import { StPeterStourtonModel } from "./components/domus-models";

export const DomusModels: { [model: string | symbol]: DomusModelSettings } = {
  church_of_st_peter_stourton: {
    model: StPeterStourtonModel,
    title: "St Peter's Church. Stourton, England",
  },
};
