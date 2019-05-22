<template>
  <div :class="['archivalInfo']">
    <!--基本信息-->
    <div class="module" v-if="baseInfo">
      <div class="moduleTitle">
        基本信息
        <div class="button-wrapper">
          <button
            type="button"
            class="action-button submit"
            v-show="!baseInfoEdit"
            @click="editBaseInfo"
          >编辑</button>
          <button
            type="button"
            class="action-button submit"
            @click="saveBaseInfo"
            v-show="baseInfoEdit"
          >保存</button>
          <button
            type="button"
            class="action-button cancel"
            @click="cancelBaseInfo"
            v-show="baseInfoEdit"
          >取消</button>
        </div>
      </div>
      <Form :label-width="108" label-position="right" v-if="!baseInfoEdit">
        <div class="line">
          <FormItem label="来源渠道：" style="width: 216px;">{{baseInfo.channel}}</FormItem>
          <FormItem label="活动名称：" style="width: 216px;">{{baseInfo.activityName}}</FormItem>
          <FormItem label="性别：" style="width: 216px;">{{ genderMap[baseInfo.gender] }}</FormItem>
        </div>
        <div class="line">
          <FormItem label="所在省：" style="width: 216px;">{{ areaMap[baseInfo.province] }}</FormItem>
          <FormItem label="所在市：" style="width: 216px;">{{ areaMap[baseInfo.city] }}</FormItem>
          <FormItem label="所在区/县：" style="width: 216px;">{{ areaMap[baseInfo.county] }}</FormItem>
        </div>
        <div class="line">
          <FormItem label="所在学校：" style="width: 216px;">{{ baseInfo.school }}</FormItem>
        </div>
        <div class="line">
          <FormItem label="学生性格：">
            <template v-for="(character, index) in baseInfo.character">
              <span class="character-tag" :key="index">{{ characterMap[character] }}</span>
            </template>
          </FormItem>
        </div>
        <div class="line">
          <FormItem label="家庭情况描述：">{{ baseInfo.family_information }}</FormItem>
        </div>
      </Form>
      <Form :label-width="108" label-position="right" v-if="baseInfoCache" v-show="baseInfoEdit">
        <div class="line">
          <FormItem label="来源渠道：" style="width: 216px;">{{baseInfo.channel}}</FormItem>
          <FormItem label="活动名称：" style="width: 216px;">{{baseInfo.activityName}}</FormItem>
          <FormItem label="性别：" style="width: 216px;">
            <Select style="width: 120px;" v-model="baseInfoCache.gender" placeholder="请选择">
              <Option v-for="item in genders" :key="item.key" :value="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </div>
        <div class="line">
          <FormItem label="所在省：" style="width: 216px;">
            <Select style="width: 120px;" v-model="baseInfoCache.province" placeholder="请选择">
              <Option
                v-for="item in provinceCopy"
                :key="item.region_code"
                :value="item.region_code"
              >{{ item.region_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="所在市：" style="width: 216px;">
            <Select style="width: 120px;" v-model="baseInfoCache.city" placeholder="请选择">
              <Option
                v-for="item in citysCopy"
                :key="item.region_code"
                :value="item.region_code"
              >{{ item.region_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="所在区/县：" style="width: 216px;">
            <Select style="width: 120px;" v-model="baseInfoCache.county" placeholder="请选择">
              <Option
                v-for="item in countysCopy"
                :key="item.region_code"
                :value="item.region_code"
              >{{ item.region_name }}</Option>
            </Select>
          </FormItem>
        </div>
        <div class="line">
          <FormItem label="所在学校：">
            <Input style="width:150px" v-model="baseInfoCache.school" placeholder="请输入学校名称"/>
          </FormItem>
          <!-- 学校级别（待定） -->
          <!-- <FormItem label="学校级别：">
              <Select style="width: 90px;" v-model="formValidate.level" placeholder="请选择">
                <Option value="0">公办-普通</Option>
                <Option value="1">公办-重点</Option>
                <Option value="2">公办-国际部</Option>
                <Option value="3">私立-普通</Option>
                <Option value="4">私立-重点</Option>
                <Option value="5">私立-国际部</Option>
                <Option value="6">国际学校</Option>
              </Select>
            </FormItem>
            <FormItem label="年级：">
              <Select style="width: 90px;" v-model="formValidate.garde" placeholder="请选择">
                <Option value="小三"></Option>
                <Option value="小四">小四</Option>
                <Option value="小五">小五</Option>
                <Option value="小六">小六</Option>
                <Option value="预初">预初</Option>
                <Option value="初一">初一</Option>
                <Option value="初二">初二</Option>
                <Option value="初三">初三</Option>
                <Option value="初四">初四</Option>
                <Option value="高一">高一</Option>
                <Option value="高二">高二</Option>
                <Option value="高三">高三</Option>
              </Select>
            </FormItem>
            <FormItem label="补习情况：">
              <Select style="width: 90px;" v-model="formValidate.subject" placeholder="请选择">
                <Option value="0">未补习过</Option>
                <Option value="1">参加过线下培训</Option>
                <Option value="2">参加过线上培训</Option>
              </Select>
            </FormItem>
            <FormItem label="补习机构：">
              <Input style="width:90px" v-model="formValidate.subject" placeholder="请输入补习机构"/>
          </FormItem>-->
        </div>
        <div class="line">
          <FormItem label="学生性格：">
            <CheckboxGroup v-model="baseInfoCache.character">
              <Checkbox v-for="character in characters" :key="character.key" :label="character.key">
                <span>{{ character.value }}</span>
              </Checkbox>
            </CheckboxGroup>
          </FormItem>
        </div>
        <div class="line">
          <FormItem label="家庭情况描述：">
            <Input
              v-model="baseInfoCache.family_information"
              type="textarea"
              :maxlength="100"
              :autosize="{minRows: 6,maxRows: 8}"
              style="width: 500px;margin-left: 0;"
              placeholder="请输入家庭情况描述，字数不得超过100"
            />
          </FormItem>
        </div>
      </Form>
    </div>
    <!--学习需求（先不做）-->
    <!-- <div class="module" v-show="0">
        <p class="moduleTitle">学习需求</p>
        <div class="line" style="max-width: 952px;">
          <template v-for="(item,index) in formValidate.studyNeeds">
            <FormItem
              label="学习科目"
              :prop="'studyNeeds.' + index + '.subject'"
              :rules="{required: true, message: '名称不能为空', trigger: 'change'}"
            >
              <Select style="width: 90px;" v-model="item.subject" placeholder="请选择学习科目">
                <Option value="0">语文</Option>
                <Option value="1">数学</Option>
                <Option value="2">英语</Option>
                <Option value="3">物理</Option>
                <Option value="4">化学</Option>
                <Option value="5">生物</Option>
                <Option value="6">地理</Option>
                <Option value="7">历史</Option>
                <Option value="8">政治</Option>
                <Option value="9">科学</Option>
              </Select>
            </FormItem>
            <FormItem
              label="教材版本："
              :prop="'studyNeeds.' + index + '.version'"
              :rules="{required: true, message: '教材版本不能为空', trigger: 'blur'}"
            >
              <Input style="width:120px" v-model="item.version" placeholder="请输入教材版本"/>
            </FormItem>
            <FormItem
              label="初始成绩："
              :prop="'studyNeeds.' + index + '.firstAchievement'"
              :rules="{required: true, message: '成绩不能为空', trigger: 'blur'}"
            >
              <Input style="width:40px" v-model="item.firstAchievement" placeholder="得分"/>
              <span style="margin: 0 5px;">/</span>
              <Input style="width:40px" v-model="item.total" placeholder="总分"/>
            </FormItem>
            <FormItem
              label="目标成绩："
              :prop="'studyNeeds.' + index + '.goalAchievement'"
              :rules="{required: true, message: '目标成绩不能为空', trigger: 'blur'}"
            >
              <Input style="width:100px" v-model="item.goalAchievement" placeholder="请输入目标成绩"/>
            </FormItem>
          </template>
          <p class="addForm" @click="addNeeds">+添加需求</p>
        </div>
    </div>-->
    <!--家长信息-->
    <div class="module" v-if="familyMembers">
      <div class="moduleTitle">
        家长信息
        <div class="button-wrapper">
          <button
            type="button"
            class="action-button submit"
            @click="editFamilyMembers"
            v-show="!familyMembersEdit"
          >{{ familyMembers.length ? '编辑' : '添加' }}</button>
          <button
            type="button"
            class="action-button submit"
            @click="saveFamilyMembers"
            v-show="familyMembersEdit"
          >保存</button>
          <button
            type="button"
            class="action-button cancel"
            @click="cancelFamilyMembers"
            v-show="familyMembersEdit"
          >取消</button>
        </div>
      </div>
      <Form
        :label-width="96"
        label-position="right"
        v-if="familyMembers"
        v-show="!familyMembersEdit"
      >
        <div class="line" v-for="(item, index) in familyMembers" :key="index">
          <FormItem label="家长关系：">
            <span style="display:inline-block;width:120px;">{{ relationshipMap[item.relationship] }}</span>
          </FormItem>
          <FormItem label="姓名：">
            <span style="display:inline-block;width:120px;">{{ item.name }}</span>
          </FormItem>
          <FormItem label="手机号：">
            <span style="display:inline-block;width:120px;">{{ item.mobile }}</span>
          </FormItem>
        </div>
      </Form>
      <Form
        :model="familyMembersCache"
        :label-width="96"
        label-position="right"
        ref="familyMembersForm"
        v-show="familyMembersEdit"
      >
        <div class="line" v-for="(item, index) in familyMembersCache.items" :key="index">
          <FormItem label="家长关系：">
            <Select style="width: 120px;" v-model="item.relationship" placeholder="请选择">
              <Option
                v-for="(relationship, relationshipIndex) in relationships"
                :value="relationship.key"
                :key="relationshipIndex"
              >{{ relationship.value }}</Option>
            </Select>
          </FormItem>
          <FormItem label="姓名：">
            <Input style="width:120px" v-model="item.name" placeholder="请输入姓名"/>
          </FormItem>
          <FormItem
            label="手机号："
            :prop="'items.' + index + '.mobile'"
            :rules="{ validator: validPhone, trigger: 'blur' }"
          >
            <Input style="width:120px" type="number" v-model="item.mobile" placeholder="请输入手机号"/>
          </FormItem>
          <p class="subForm" @click="subMember(index)">-删除信息</p>
          <p
            class="addForm"
            v-show="index === familyMembersCache.items.length - 1"
            @click="addMember"
          >+添加信息</p>
        </div>
        <p class="addForm" v-show="0 === familyMembersCache.items.length" @click="addMember">+添加信息</p>
      </Form>
    </div>
    <!--设备信息 （先不做）-->
    <!-- <div class="module" v-show="0">
        <p class="moduleTitle">设备信息</p>
        <div class="line">
          <FormItem label="电脑：">
            <Select style="width: 90px;" v-model="formValidate.level" placeholder="请选择">
              <Option value="0">有</Option>
              <Option value="1">无</Option>
            </Select>
          </FormItem>
          <FormItem label="平板：">
            <Select style="width: 90px;" v-model="formValidate.level" placeholder="请选择">
              <Option value="0">有</Option>
              <Option value="1">无</Option>
            </Select>
          </FormItem>
          <FormItem label="麦克风：">
            <Select style="width: 90px;" v-model="formValidate.level" placeholder="请选择">
              <Option value="0">有</Option>
              <Option value="1">无</Option>
            </Select>
          </FormItem>
          <FormItem label="耳机：">
            <Select style="width: 90px;" v-model="formValidate.level" placeholder="请选择">
              <Option value="0">有</Option>
              <Option value="1">无</Option>
            </Select>
          </FormItem>
          <FormItem label="手写板：">
            <Select style="width: 90px;" v-model="formValidate.level" placeholder="请选择">
              <Option value="0">有</Option>
              <Option value="1">无</Option>
            </Select>
          </FormItem>
        </div>
    </div>-->
  </div>
</template>

<script>
import { getFieldOptions } from "../../../../getData.js";

const phoneREG = /^1\d{10}$/; //手机正则
const dropMap = arr => {
  if (Array.isArray(arr) && arr.length) {
    const obj = {};
    arr.forEach(e => {
      obj[e.key] = e.value;
    });
    return obj;
  }
  return false;
};

const clone = target => JSON.parse(JSON.stringify(target));

const Relation = function(name = "", mobile = "", relationship = "") {
  this.name = name;
  this.mobile = mobile;
  this.relationship = relationship;
};

const formatBaseData = ({ base_info, family_members }) => {
  // 性别，省地市以及家庭关系等字段转为字符串
  ["gender", "province", "city", "county"].map(e => {
    base_info[e] = base_info[e].toString();
  });
  family_members.forEach(e => {
    e.relationship = e.relationship.toString();
  });
  // 移除性格字段中空的项
  base_info.character = base_info.character.filter(e => e !== "");
  return {
    base_info,
    family_members
  };
};

export default {
  props: ["leadId"],
  data() {
    return {
      baseInfo: null,
      baseInfoEdit: 0,
      baseInfoCache: null,
      areaLock: 0,
      familyMembers: null,
      familyMembersEdit: 0,
      familyMembersCache: {
        items: [
          {
            name: "",
            mobile: 1,
            relationship: 1
          }
        ]
      },
      relationships: null,
      relationshipMap: [],
      genderMap: [],
      characterMap: [],
      provinceCopy: [],
      citys: [],
      countys: [],
      citysCopy: [],
      countysCopy: []
    };
  },
  async created() {
    const app = this;
    const api = this.$store.state.api;
    // 所用接口
    app.api = {
      base: api.customers.getBaseInfo,
      province: api.city.provinces,
      area: api.city.areas,
      save: api.customers.saveBaseInfo
    };
    // 性别列表
    app.getGenders();
    // 家长关系列表
    app.getRelationships();
    // 学生性格列表
    app.getCharacters();
    // 省列表
    app.getProvinces();
    // 地市Map
    app.areaMap = app.getAreaMap();
    app.areaChildMap = app.getAreaChildMap();
    // 基本信息
    await app.getBase(app.leadId);
  },
  mounted() {},
  watch: {
    baseInfoEdit(val) {
      if (this.baseInfoEdit) {
        this.areaLock = 0;
      }
    },
    "baseInfoCache.province"(val) {
      this.areaLock++;
      if (this.baseInfoEdit && this.areaLock > 1) {
        this.updateCitys(val);
      }
    },
    "baseInfoCache.city"(val) {
      this.areaLock++;
      if (this.baseInfoEdit && this.areaLock > 2) {
        this.updateCountys(val);
      }
    }
  },
  methods: {
    clone(target) {
      return JSON.parse(JSON.stringify(target));
    },
    getAreaMap() {
      const areas = localStorage.getItem("areaMap");
      return areas ? JSON.parse(areas) : {};
    },
    validPhone(rule, value, callback) {
      if (value) {
        if (!phoneREG.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    insertArea(...areas) {
      areas.forEach(area => {
        if (!this.areaMap[area.region_code]) {
          this.areaMap[area.region_code] = area.region_name;
        }
      });
      localStorage.setItem("areaMap", JSON.stringify(this.areaMap));
    },
    getAreaChildMap() {
      const areaChlids = localStorage.getItem("areaChlidMap");
      return areaChlids ? JSON.parse(areaChlids) : {};
    },
    insertAreaChild(area) {
      if (!this.areaChildMap[area.code]) {
        this.areaChildMap[area.code] = area.child;
        localStorage.setItem("areaChlidMap", JSON.stringify(this.areaChildMap));
      }
    },
    async getGenders() {
      this.genders = await getFieldOptions("sex");
      this.genderMap = dropMap(this.genders);
    },
    async getRelationships() {
      this.relationships = await getFieldOptions("family_relationship");
      if (!this.relationships.length) {
        // 家庭关系测试数据
        this.relationships = [
          { key: 0, value: "父亲" },
          { key: 1, value: "母亲" }
        ];
      }
      this.relationshipMap = dropMap(this.relationships);
    },
    async getCharacters() {
      this.characters = await getFieldOptions("character");
      if (!this.characters.length) {
        // 学生性格测试数据
        this.characters = [
          { key: "0", value: "开朗" },
          { key: "1", value: "自闭" }
        ];
      }
      this.characterMap = dropMap(this.characters);
    },
    async getProvinces() {
      let res = [];
      await this.$axios.post(this.api.province).then(data => {
        if (data.status) {
          res = data.data.data;
          this.provinces = res;
          this.insertArea(...res);
        }
      });
      return res;
    },
    async getAreas(code) {
      if (!code) {
        return [];
      }
      let res = [];
      if (this.areaChildMap[code]) {
        res = this.areaChildMap[code];
      } else {
        await this.$axios
          .post(this.api.area, {
            region_code: code
          })
          .then(data => {
            if (data.status) {
              res = data.data.data;
              this.insertArea(...res);
              const obj = {
                code,
                child: res
              };
              this.insertAreaChild(obj);
            }
          });
      }
      return res;
    },
    async updateCitys(code) {
      const areas = await this.getAreas(code);
      this.baseInfoCache.city = "";
      this.citysCopy = areas;
    },
    async updateCountys(code) {
      const areas = await this.getAreas(code);
      this.baseInfoCache.county = "";
      this.countysCopy = areas;
    },
    async getBase(id) {
      if (id) {
        await this.$axios
          .post(this.api.base, { lead_id: id })
          .then(async data => {
            if (data.status) {
              data = formatBaseData(data.data.data);
              this.baseInfo = data.base_info;
              this.familyMembers = data.family_members;
              // 获取市县列表
              this.citys = await this.getAreas(this.baseInfo.province);
              this.countys = await this.getAreas(this.baseInfo.city);
            }
          });
      }
    },
    editBaseInfo() {
      this.baseInfoCache = clone(this.baseInfo);
      this.provinceCopy = clone(this.provinces);
      this.citysCopy = clone(this.citys);
      this.countysCopy = clone(this.countys);
      this.baseInfoEdit = 1;
    },
    async saveBaseInfo() {
      const info = this.baseInfoCache;
      const req = {
        lead_id: this.leadId,
        gender: info.gender,
        province: info.province || 0,
        city: info.city || 0,
        county: info.county || 0,
        school: info.school,
        character: info.character.map(e => parseInt(e)),
        family_info: info.family_information
      };
      if (await this.saveForm(req)) {
        this.baseInfo = clone(this.baseInfoCache);
        this.baseInfoCache = null;
      }
      this.cancelBaseInfo();
    },
    cancelBaseInfo() {
      this.baseInfoEdit = 0;
    },
    editFamilyMembers() {
      this.familyMembersCache.items = clone(this.familyMembers);
      this.familyMembersEdit = 1;
    },
    async saveForm(data) {
      let res = false;
      await this.$axios.post(this.api.save, data).then(data => {
        if (data.status) {
          this.$Notice.success({
            title: "",
            desc: "更新成功",
            duration: 2
          });
          res = true;
        } else {
          this.$Notice.error({
            title: "",
            desc: "更新失败",
            duration: 2
          });
        }
      });
      return res;
    },
    saveFamilyMembers() {
      if (!this.familyMembersCache.items.length) {
        this.cancelFamilyMembers();
        return;
      }
      this.$refs.familyMembersForm.validate(async valid => {
        if (valid) {
          if (
            this.familyMembersCache.items.filter(
              e => e.name && e.mobile && e.relationship
            ).length
          ) {
            const req = {
              lead_id: this.leadId,
              family_members: this.familyMembersCache.items
            };
            const res = await this.saveForm(req);
            this.familyMembers = clone(this.familyMembersCache.items);
            this.cancelFamilyMembers();
          } else if (
            this.familyMembersCache.items.filter(
              e => e.name || e.mobile || e.relationship
            ).length
          ) {
            this.$Notice.error({
              title: "",
              desc: "请把家长信息填写完整！",
              duration: 3
            });
          } else {
            this.cancelFamilyMembers();
          }
        }
      });
    },
    cancelFamilyMembers() {
      this.familyMembersEdit = 0;
    },
    addMember() {
      const obj = {
        name: "",
        mobile: "",
        relationship: 0
      };
      this.familyMembersCache.items.push(new Relation());
    },
    subMember(index) {
      this.familyMembersCache.items.splice(index, 1);
    }
  }
};
</script>

<style lang="less">
.character-tag {
  margin-right: 10px;
  display: inline-block;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>