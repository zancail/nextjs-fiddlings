import Image from 'next/image'

const RichTextAsset = ({ id, assets }) => {
  const asset = assets?.find((asset) => asset.sys.id === id)

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />
  }

  return null
}

export default RichTextAsset
