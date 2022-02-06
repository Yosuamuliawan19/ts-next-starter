import React, { useState } from 'react';
import { Tree } from '@douyinfe/semi-ui';
import {
  IconFixedStroked,
  IconSectionStroked,
  IconAbsoluteStroked,
  IconComponentStroked,
} from '@douyinfe/semi-icons';
import { usePage } from 'state/Page';
import { ELEMENT_TYPES } from '@constants/';

export default function ComponentTree() {
  // const [selected, setSelected] = useState(new Set());
  const [selectedThroughParent, setSelectedThroughParent] = useState(new Set());

  const elements = usePage((state) => state.elements);

  const [selected, setSelected] = usePage((state) => [
    state.selectedElement,
    state.setSelectedElement,
  ]);
  const elementTreeData =
    elements
      ?.filter((data) => data.type !== ELEMENT_TYPES.NONE)
      .map((data, idx) => {
        return {
          label: data?.type,
          icon: (
            <IconFixedStroked
              style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
            />
          ),
          key: `${data?.type}-${idx}`,
          onClick: () => {},
        };
      }) || [];
  const defaultTreeData = [
    {
      label: 'Fixed Black Button',
      icon: (
        <IconFixedStroked
          style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
        />
      ),
      key: 'fix-btn-0',
    },
    {
      label: 'Module',
      key: 'module-0',
      icon: (
        <IconSectionStroked
          style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
        />
      ),
      children: [
        {
          label: 'Free Components',
          icon: (
            <IconAbsoluteStroked
              style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
            />
          ),
          key: 'free-compo-0',
        },
        {
          label: 'Split Container',
          icon: (
            <IconSectionStroked
              style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
            />
          ),
          key: 'split-col-0',
          children: [
            {
              label: 'Button',
              icon: (
                <IconComponentStroked
                  style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
                />
              ),
              key: 'btn-0',
            },
            {
              label: 'Button',
              icon: (
                <IconComponentStroked
                  style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
                />
              ),
              key: 'btn-1',
            },
          ],
        },
      ],
    },
    {
      label: 'Module',
      icon: (
        <IconSectionStroked
          style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
        />
      ),
      key: 'module-1',
      children: [
        {
          label: 'Custom Component',
          icon: (
            <IconComponentStroked
              style={{ marginRight: 8, color: 'var(--semi-color-text-2)' }}
            />
          ),
          key: 'cus-0',
        },
      ],
    },
  ];
  const [treeData, setTreeData] = useState(defaultTreeData);

  const onDrop = (info) => {
    const { dropToGap, node, dragNode } = info;
    const dropKey = node.key;
    const dragKey = dragNode.key;
    const dropPos = node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const data = [...treeData];
    const loop = (data, key, callback) => {
      data.forEach((item, ind, arr) => {
        if (item.key === key) return callback(item, ind, arr);
        if (item.children) return loop(item.children, key, callback);
      });
    };

    let dragObj;
    loop(data, dragKey, (item, ind, arr) => {
      arr.splice(ind, 1);
      dragObj = item;
    });

    if (!dropToGap) {
      loop(data, dropKey, (item, ind, arr) => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if (dropPosition === 1 && node.children && node.expanded) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let dropNodeInd;
      let dropNodePosArr;
      loop(data, dropKey, (item, ind, arr) => {
        dropNodePosArr = arr;
        dropNodeInd = ind;
      });
      if (dropPosition === -1) {
        dropNodePosArr.splice(dropNodeInd, 0, dragObj);
      } else {
        dropNodePosArr.splice(dropNodeInd + 1, 0, dragObj);
      }
    }
    setTreeData(data);
  };

  const findDescendantKeys = (node) => {
    const res = [node.key];
    const findChild = (item) => {
      if (!item) return;
      const { children } = item;

      if (children && children.length) {
        children.forEach((child) => {
          res.push(child.key);
          findChild(child);
        });
      }
    };
    findChild(node);
    return res;
  };

  const handleSelect = (key, bool, node) => {
    setSelected(new Set([key]));
    const descendantKeys = findDescendantKeys(node);
    setSelectedThroughParent(new Set(descendantKeys));
  };

  const renderLabel = ({ className, data, onClick, expandIcon }) => {
    const { label, icon, key } = data;
    const isLeaf = !(data.children && data.children.length);
    const style = {
      backgroundColor: selected.has(key)
        ? 'rgba(var(--semi-blue-0), 1)'
        : selectedThroughParent.has(key)
        ? 'rgba(var(--semi-blue-0), .5)'
        : 'transparent',
    };
    return (
      <li
        className={className}
        role="treeitem"
        onClick={onClick}
        style={style}
        key={key}
      >
        {isLeaf ? <span style={{ width: 24 }}></span> : expandIcon}
        {icon}
        <span>{label}</span>
      </li>
    );
  };
  console.log('selected', selected);

  return (
    <>
      <Tree
        treeData={elementTreeData}
        draggable
        onDrop={onDrop}
        renderFullLabel={renderLabel}
        onSelect={handleSelect}
        defaultExpandAll
        filterTreeNode
        showFilteredOnly
        placeholder="Search element"
        dropdownStyle={{
          overflow: 'hidden',
        }}
        // virtualize={{
        //   itemSize: 28,
        //   // dropDown height 300 minus search box height minus padding 8 * 2
        //   // or if you set dropDown height, it will automatically fill rest space
        //   height: 236,
        // }}
      />
    </>
  );
}
