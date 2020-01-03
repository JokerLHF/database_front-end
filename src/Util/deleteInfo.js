import { Modal } from 'antd'

function deleteConfirm (title, content, deleteAjax) {
  //title的名称, 内容的名称
  const showTitle = title
  const showContent = content
  Modal.confirm({
    title: showTitle,
    content: showContent,
    okText: '确认',
    cancelText: '取消',
    onOk () {
      deleteAjax()
    },
    onCancel () {
    }
  })
}

export default deleteConfirm
