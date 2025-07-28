import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  // シークレットキーの検証
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { api, type } = body

    // APIの種類に応じて適切なパスを再検証
    switch (api) {
      case 'menu_category':
        revalidatePath('/menu')
        revalidatePath('/menu/[category]', 'page')
        break
      
      case 'menu_item':
        revalidatePath('/')
        revalidatePath('/menu')
        revalidatePath('/menu/[category]', 'page')
        revalidatePath('/item/[slug]', 'page')
        break
      
      case 'site_settings':
        revalidatePath('/', 'layout')
        break
      
      default:
        // 不明なAPIの場合は全体を再検証
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      api,
      type 
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 }
    )
  }
}