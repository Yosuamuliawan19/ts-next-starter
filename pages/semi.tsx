import { BaseLayout, ContentLayout, Navbar } from '@components';
import ExposureSection from '@components/Home/ExposureSection';
import Footer from '@components/Home/Footer';
import { HeroSection } from '@components/Home/HeroSection';
import Sidebar from '@components/Home/Sidebar';
import TabView from '@components/Home/TabView';
import Head from 'next/head';
import React from 'react';
import { Form, Modal, Col, Row, Button, SideSheet } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { MLSection } from './projects/ml-in-polyphonics';
import { serialize } from 'next-mdx-remote/serialize';

const content = `

## Investigating Machine Learning Approaches for Predominant Musical Instrument Recognition in Polyphonic Music

First author - submitted to [2020 Joint Conference on AI Music Creativity](https://easychair.org/cfp/csmc-mume-2020)

This paper is produced based on the work that I have done with [Dr Jeremie Clos](http://www.cs.nott.ac.uk/~pszjc1/) during my undergraduate dissertation.

### Background
We were trying to predict the predominant music in a mixture of polyphonic music. Techniques employed in this research are:
- Background Seperation
- Feature Extraction using MFCC, and various other audio features
- Hyperparameter selection and comparison of different machine learning models

### Findings
- The MFCC features gives the best perfomance, accross the models. This is consistent in the literature.
- Features from the spectral domain is nessecary to produce best performing models, in addition to cepstral features.
- The random forest architecture achieves best out of the three classical ML models (SVM, Random Forest, and Neural Network).

`;
function ResponsiveModal({ children, isModal = false, visible, setVisible }) {
  const [width, setWidth] = React.useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  return (
    <>
      {isMobile ? (
        <SideSheet
          title="Sidesheet"
          visible={visible}
          onCancel={() => setVisible(false)}
          placement={'bottom'}
          disableScroll={false}
        >
          {children}
        </SideSheet>
      ) : (
        <Modal
          width={720}
          title="Basic Modal"
          visible={visible}
          onOk={() => setVisible(false)}
          // afterClose={this.handleAfterClose} // >= 1.16.0
          onCancel={() => setVisible(false)}
        >
          {children}
        </Modal>
      )}
    </>
  );
}
export default function Home({ source }) {
  const {
    Input,
    InputNumber,
    AutoComplete,
    Select,
    TreeSelect,
    Cascader,
    DatePicker,
    TimePicker,
    TextArea,
    CheckboxGroup,
    Checkbox,
    RadioGroup,
    Radio,
    Slider,
    Rating,
    Switch,
    TagInput,
  } = Form;
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Head>
        <title>Home | Yosua Muliawan</title>
      </Head>
      <Navbar />
      <Sidebar />
      <BaseLayout>
        <HeroSection />
        <ResponsiveModal visible={visible} setVisible={setVisible}>
          <div className="font-display  flex dark:text-white">
            <MLSection source={source} />
          </div>
        </ResponsiveModal>
        <ContentLayout>
          <div>
            <div className="text-xl">Pages</div>
            <Row>
              <InputNumber
                field="number"
                label="Number of applications（InputNumber）"
                initValue={20}
                // style={style}
              />
              <motion.button
                whileHover={{ scale: 1.1, opacity: 0.85 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setVisible(true)}
                className="bg-green-100 text-green-500 text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
              >
                New page
              </motion.button>
            </Row>
          </div>
          <BasicDemoWithInit />
        </ContentLayout>
        <ExposureSection />
        <div className="mt-4  "></div>
        <TabView />
        <Footer />
      </BaseLayout>
    </>
  );
}

class BasicDemoWithInit extends React.Component {
  constructor() {
    super();
    this.state = {
      initValues: {
        name: 'semi',
        business: ['hotsoon'],
        role: 'ued',
        switch: true,
      },
    };
    this.getFormApi = this.getFormApi.bind(this);
  }

  getFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    const {
      Input,
      InputNumber,
      AutoComplete,
      Select,
      TreeSelect,
      Cascader,
      DatePicker,
      TimePicker,
      TextArea,
      CheckboxGroup,
      Checkbox,
      RadioGroup,
      Radio,
      Slider,
      Rating,
      Switch,
      TagInput,
    } = Form;
    const { initValues } = this.state;
    const plainOptions = ['A', 'B', 'C'];
    const style = { width: '90%' };
    const treeData = [
      {
        label: 'Asia',
        value: 'Asia',
        key: '0',
        children: [
          {
            label: 'China',
            value: 'China',
            key: '0-0',
            children: [
              {
                label: 'Beijing',
                value: 'Beijing',
                key: '0-0-0',
              },
              {
                label: 'Shanghai',
                value: 'Shanghai',
                key: '0-0-1',
              },
            ],
          },
        ],
      },
      {
        label: 'North America',
        value: 'North America',
        key: '1',
      },
    ];

    return (
      <Form
        getFormApi={this.getFormApi}
        initValues={initValues}
        style={{ padding: 10, width: '100%' }}
        onValueChange={(v) => console.log(v)}
      >
        <Row>
          <Col span={12}>
            <Input
              field="name"
              label="Name（Input）"
              initValue={'mikeya'}
              style={style}
              trigger="blur"
            />
          </Col>
          <Col span={12}>
            <DatePicker
              field="date"
              label="Date（DatePicker）"
              style={style}
              placeholder="Choose data"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Select
              field="role"
              style={style}
              label="Role（Select）"
              placeholder="Choose role"
            >
              <Select.Option value="qa">Quality Assurance</Select.Option>
              <Select.Option value="rd">Software Engineer</Select.Option>
              <Select.Option value="pm">Product Manager</Select.Option>
              <Select.Option value="ued">Designer</Select.Option>
            </Select>
          </Col>
          <Col span={12}>
            <Select
              field="business"
              multiple
              style={style}
              placeholder="Choose application"
              label="Application（Multiple Select）"
            >
              <Select.Option value="abc">Semi</Select.Option>
              <Select.Option value="hotsoon">Vigo</Select.Option>
              <Select.Option value="xigua">BuzzVideo</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Cascader
              placeholder="Choose Area"
              treeData={treeData}
              field="area"
              label="Area（Cascader）"
              style={style}
            ></Form.Cascader>
          </Col>
          <Col span={12}>
            <Form.TreeSelect
              field="tree"
              style={style}
              label="Node（TreeSelect）"
              placeholder="Select Service Node"
              treeData={treeData}
              filterTreeNode
            ></Form.TreeSelect>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <TextArea
              style={style}
              field="description"
              label="Apply Reason（TextArea）"
            />
          </Col>
          <Col span={12}>
            <CheckboxGroup
              field="type"
              label="Apply type（CheckboxGroup）"
              initValue={['user', 'admin']}
              rules={[{ Requested: true }]}
            >
              <Checkbox value="admin">admin</Checkbox>
              <Checkbox value="user">user</Checkbox>
              <Checkbox value="guest">guest</Checkbox>
              <Checkbox value="root">root</Checkbox>
            </CheckboxGroup>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <RadioGroup
              field="isMonopolize"
              label="Whether exclusive resources（Radio）"
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </RadioGroup>
          </Col>
          <Col span={12}>
            <CheckboxGroup
              options={plainOptions}
              field="checkbox"
              label="Type（CheckboxGroup）"
              direction="horizontal"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <TimePicker
              field="time"
              label="End Time（TimePicker）"
              style={{ width: '90%' }}
            />
          </Col>
          <Col span={12}>
            <InputNumber
              field="number"
              label="Number of applications（InputNumber）"
              initValue={20}
              style={style}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Slider
              field="range"
              label="Resource usage alarm threshold(%)（Slider）"
              initValue={10}
              style={{ width: '90%' }}
            />
          </Col>
          <Col span={12}>
            <Switch field="switch" label="Switch(Switch)" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Rating
              field="rating"
              label="Satisfaction(Rating)"
              initValue={2}
              style={{ width: '90%' }}
            />
          </Col>
          <Col span={12}>
            <TagInput
              field="product"
              label="Product（TagInput）"
              defaultValue={['abc', 'hotsoon']}
              style={style}
            />
          </Col>
        </Row>
        <Checkbox value="false" field="agree" noLabel={true}>
          I have read and understood the relevant regulations（Checkbox）
        </Checkbox>
        <Button
          type="secondary"
          theme="solid"
          htmlType="submit"
          className="btn-margin-right"
        >
          Submit
        </Button>
        <Button
          type="primary"
          theme="solid"
          htmlType="submit"
          className="btn-margin-right"
        >
          Submit
        </Button>
        <Button
          type="tertiary"
          theme="solid"
          htmlType="submit"
          className="btn-margin-right"
        >
          Submit
        </Button>
        <Button htmlType="reset">Reset</Button>
      </Form>
    );
  }
}
export async function getStaticProps() {
  return { props: { source: await serialize(content) } };
}
