import type IHissatsuService from "@hissatsu/hissatsu.service";
import type Hissatsu from "@hissatsu/hissatsu.entity";

class FindHissatsuById {
  constructor(private hissatsuService: IHissatsuService) {}

  async execute(id: string): Promise<Hissatsu | null> {
    return this.hissatsuService.findById(id);
  }
}

export default FindHissatsuById;
